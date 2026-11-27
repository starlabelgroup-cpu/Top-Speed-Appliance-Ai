const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const LEAD_FROM_EMAIL = Deno.env.get("LEAD_FROM_EMAIL")
const LEAD_WEBHOOK_SECRET = Deno.env.get("LEAD_WEBHOOK_SECRET")
const LEAD_TO_EMAIL = "starlabelgroup@gmail.com"

const escapeHtml = (value: unknown) =>
  String(value ?? "—").replace(/[&<>"']/g, (char) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] as string
  ))

Deno.serve(async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 })
  }

  if (!RESEND_API_KEY || !LEAD_FROM_EMAIL || !LEAD_WEBHOOK_SECRET) {
    return new Response("Lead notification is not configured", { status: 500 })
  }

  if (request.headers.get("x-webhook-secret") !== LEAD_WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 })
  }

  const payload = await request.json()
  const lead = payload?.record ?? payload

  const fields: Array<[string, unknown]> = [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Address", lead.address],
    ["City", lead.city],
    ["Service", lead.service_type],
    ["Issue", lead.issue_description],
    ["Source", lead.lead_source],
    ["Campaign", lead.campaign_id],
    ["Keyword", lead.keyword],
  ]

  const html = `<h2>New service request</h2><table>${fields
    .map(([label, value]) => `<tr><td><strong>${label}</strong></td><td>${escapeHtml(value)}</td></tr>`)
    .join("")}</table>`

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: LEAD_FROM_EMAIL,
      to: [LEAD_TO_EMAIL],
      subject: `New service request: ${lead.service_type ?? "Website lead"}`,
      html,
    }),
  })

  if (!response.ok) {
    return new Response(await response.text(), { status: 502 })
  }

  return new Response(JSON.stringify({ sent: true }), {
    headers: { "Content-Type": "application/json" },
  })
})
