import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import prisma from "../config/prisma.js";

const router = Router();

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

const bookingSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30),
  appliance: z.string().trim().min(2).max(60),
  brand: z.string().trim().min(1).max(60),
  model: z.string().trim().max(60).optional().default(""),
  age: z.string().trim().max(20).optional().default(""),
  symptoms: z.array(z.string().trim().max(100)).max(20).default([]),
  description: z.string().trim().min(5).max(2000),
  serviceAddress: z.string().trim().min(5).max(300),
  preferredDate: z.string().date(),
  preferredTime: z.string().trim().min(1).max(40),
  urgency: z.enum(["normal", "urgent", "emergency"]),
  source: z.string().trim().max(60).optional().default("website"),
  termsAccepted: z.literal(true),
});

const URGENCY = {
  normal: "NORMAL",
  urgent: "URGENT",
  emergency: "EMERGENCY",
};

router.post("/", bookingLimiter, async (req, res, next) => {
  try {
    const input = bookingSchema.parse(req.body);

    const booking = await prisma.$transaction(async (tx) => {
      const customer = await tx.customer.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone,
        },
      });

      return tx.booking.create({
        data: {
          customerId: customer.id,
          appliance: input.appliance,
          brand: input.brand,
          model: input.model,
          age: input.age,
          symptoms: input.symptoms,
          issue: input.description,
          serviceAddress: input.serviceAddress,
          preferredDate: new Date(input.preferredDate),
          preferredTime: input.preferredTime,
          urgency: URGENCY[input.urgency],
          source: input.source,
          termsAcceptedAt: new Date(),
        },
        select: { id: true, status: true, createdAt: true },
      });
    });

    res.status(201).json({
      message: "Booking request received.",
      booking,
    });
  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        error: "Please check the booking information.",
        details: error.issues,
      });
    }

    next(error);
  }
});

export default router;
