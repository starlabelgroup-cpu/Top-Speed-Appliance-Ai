import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import prisma from "./config/prisma.js";
import bookingRoutes from "./routes/bookings.routes.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: (process.env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim()).filter(Boolean),
  })
);
app.use(express.json({ limit: "100kb" }));

app.get("/api/v1/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", database: "connected" });
  } catch {
    res.status(503).json({ status: "degraded", database: "unavailable" });
  }
});

app.use("/api/v1/bookings", bookingRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: "An unexpected error occurred." });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Top Speed Service OS API running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
