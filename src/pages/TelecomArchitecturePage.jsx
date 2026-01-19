import { Link } from 'react-router-dom'
import '../styles/telecom-architecture.css'

const architectureLayers = [
  {
    title: 'Client Layer',
    badge: 'React & React Native',
    summary: 'Customer and technician React Native apps stay in sync with the React + Vite admin web experience.',
    bullets: ['Customer App (iOS & Android)', 'Technician App (React Native)', 'Admin Web Dashboard (React + Vite)']
  },
  {
    title: 'API Layer',
    badge: 'Service Mesh',
    summary: 'Independently deployable services expose REST APIs for auth, booking, telecom, CRM, analytics, and billing.',
    bullets: ['Auth, Booking, Dispatch, Telecom', 'CRM + Analytics APIs', 'Billing and payments endpoints']
  },
  {
    title: 'Integration Layer',
    badge: 'Gateways',
    summary: 'SMS, MMS, push, and IVR gateways provide carrier-grade redundancy across Twilio, Sinch, MessageBird, and Firebase.',
    bullets: ['SMS + MMS over REST + FCM', 'Voice / IVR with Twilio + Plivo', 'Push notifications through Firebase + FQ1']
  },
  {
    title: 'Infrastructure',
    badge: 'Cloud Native',
    summary: 'PostgreSQL, Redis queues, object storage, and CI/CD pipelines run across AWS and GCP for maximum resiliency.',
    bullets: ['RDS PostgreSQL + Redis (jobs)', 'S3 / Cloud Storage for media', 'CI/CD pipelines targeting ECS, CloudFront, API Gateway']
  }
]

const serviceCapabilities = [
  {
    name: 'auth-service',
    details: ['Login, registration, refresh tokens', 'JWT issuance with role claims (admin, dispatcher, technician, customer)', 'Integrates with /auth/login, /auth/register, /auth/refresh']
  },
  {
    name: 'booking-service',
    details: ['Creates appointments and preferred times', 'Coordinates with telecom-service for confirmation SMS', 'Feeds dispatch assignments and billing estimates']
  },
  {
    name: 'dispatch-service',
    details: ['Routes jobs to technicians', 'Updates status via /jobs/update-status and /dispatch/assign', 'Powers technician job feeds']
  },
  {
    name: 'telecom-service',
    details: ['Sends SMS, MMS, voice, push notifications', 'Logs traffic into telecom_logs for compliance', 'Supports missed-call automation and QR funnels']
  },
  {
    name: 'crm-service',
    details: ['Syncs with HubSpot + Salesforce', 'Creates customers via /customers', 'Tracks review requests and nurture sequences']
  },
  {
    name: 'analytics-service',
    details: ['Campaign performance dashboards', 'Usage metering for billing-service', 'Exports to GA4 + HubSpot']
  },
  {
    name: 'billing-service',
    details: ['Stripe-backed subscriptions, invoices, usage logs', 'Job charge workflow via /billing/job-charge', 'Overage calculations for telecom usage']
  }
]

const apiEndpoints = [
  { method: 'POST', path: '/auth/login', purpose: 'Authenticate users and return access + refresh tokens.' },
  { method: 'POST', path: '/auth/register', purpose: 'Create a new tenant user with role awareness.' },
  { method: 'POST', path: '/auth/refresh', purpose: 'Rotate access tokens securely.' },
  { method: 'POST', path: '/appointments', purpose: 'Create appliance repair or dryer vent cleaning appointments.' },
  { method: 'GET', path: '/appointments/:id', purpose: 'Retrieve appointment, technician, and status history.' },
  { method: 'PATCH', path: '/appointments/:id/status', purpose: 'Advance jobs through scheduled → completed stages.' },
  { method: 'POST', path: '/dispatch/assign', purpose: 'Assign technicians and notify dispatch boards.' },
  { method: 'POST', path: '/jobs/update-status', purpose: 'Allow technicians to broadcast “on the way” or “in progress”.' },
  { method: 'POST', path: '/telecom/sms', purpose: 'Send templated SMS confirmations or promotions.' },
  { method: 'POST', path: '/telecom/voice', purpose: 'Trigger IVR flows or voice drops.' },
  { method: 'POST', path: '/telecom/push', purpose: 'Send FCM-powered push notifications.' },
  { method: 'GET', path: '/telecom/logs', purpose: 'Audit telecom usage by channel, cost, and provider.' },
  { method: 'POST', path: '/billing/subscribe', purpose: 'Activate Stripe subscription plans.' },
  { method: 'POST', path: '/billing/job-charge', purpose: 'Capture per-job payments after completion.' },
  { method: 'GET', path: '/billing/usage', purpose: 'Expose metered SMS/voice/mms usage.' }
]

const databaseTables = [
  {
    name: 'users',
    columns: ['id UUID PK', "role ENUM('admin','dispatcher','technician','customer')", 'name, email, phone', 'password_hash', 'created_at timestamp']
  },
  {
    name: 'customers',
    columns: ['id UUID PK', 'user_id FK', 'address JSONB', "preferred_contact ENUM('sms','call','push')", 'opt_in flags']
  },
  {
    name: 'appliances',
    columns: ['customer_id FK', 'type, brand, model', 'installed_date']
  },
  {
    name: 'appointments',
    columns: ['customer_id + technician_id FK', 'service_type', "status ENUM('scheduled','enroute','in_progress','completed','cancelled')", 'scheduled_at', 'completed_at']
  },
  {
    name: 'telecom_logs',
    columns: ["channel ENUM('sms','voice','push','ivr')", 'to_number, provider', 'status, cost', 'payload JSONB', 'created_at']
  },
  {
    name: 'campaigns',
    columns: ["trigger ENUM('manual','event','time')", "channel ENUM('sms','push','voice')", 'active boolean']
  },
  {
    name: 'payments',
    columns: ['appointment_id FK', 'amount, status', 'provider', 'created_at']
  },
  {
    name: 'subscriptions / usage_logs / invoices',
    columns: ['Stripe subscription + status', 'usage units + cost', 'invoice totals and periods']
  }
]

const workflowMoments = [
  {
    title: 'Omni-Channel Booking',
    steps: [
      'Customer submits booking from website or mobile app.',
      'Booking service persists appointment + preferred time and triggers telecom-service.',
      'SMS template appointment_confirmation delivers confirmed slot, push reminder follows.'
    ]
  },
  {
    title: 'Technician Dispatch Loop',
    steps: [
      'Dispatch assigns technician → technician app receives the job feed.',
      'Technician posts /jobs/update-status to broadcast "on_the_way" updates.',
      'CRM + analytics capture travel, arrival, completion, and review automation.'
    ]
  },
  {
    title: 'Missed Call Recovery',
    steps: [
      'Telecom voice event detects missed inbound call.',
      'Automation sends apology SMS with booking link and QR landing page.',
      'Conversion tracked inside analytics-service and tied to campaign attribution.'
    ]
  },
  {
    title: 'Post-Job Billing + Reviews',
    steps: [
      'Job completion triggers billing-service job charge and invoice.',
      'Stripe checkout link sent through SMS + push.',
      'Review requests queued via campaigns table with reminder logic at +24h.'
    ]
  }
]

const telecomVendors = [
  {
    name: 'Twilio',
    role: 'Primary SMS, MMS, voice, and IVR provider',
    notes: ['REST + FCM webhooks', 'Programmable Voice for dispatcher bridges', 'Fallback to Plivo for IVR if needed']
  },
  {
    name: 'Sinch',
    role: 'Voice / IVR redundancy and A2P compliance',
    notes: ['Voice/IVR 7A21 compliance', 'Used for overflow and failover scenarios']
  },
  {
    name: 'MessageBird & Kinch',
    role: 'Emergency SMS gateway',
    notes: ['Activates if Twilio + Sinch unavailable', 'Supports international reach for expansion']
  },
  {
    name: 'Firebase + FQ1 + Enegcom',
    role: 'Push notification gateway',
    notes: ['FCM for mobile apps', 'FQ1 + Enegcom handle enterprise push or proprietary devices']
  }
]

const billingHighlights = [
  {
    title: 'Stripe Subscriptions',
    copy: 'subscriptions table stores plan, status, and current_period_end. Webhooks keep tenant billing state in sync.'
  },
  {
    title: 'Usage Metering',
    copy: 'usage_logs capture SMS, voice, and MMS units with per-channel costs for overage billing.'
  },
  {
    title: 'Invoice Automation',
    copy: 'invoices join appointment charges + subscription fees, streamlining reminders via SMS + push.'
  }
]

const deploymentPipeline = [
  'GitHub push triggers automated tests and linting.',
  'Successful builds create Docker images and push to ECR.',
  'ECS deploys the service; health checks verify readiness before routing traffic.',
  'CloudFront + ALB + API Gateway expose the services globally with TLS and WAF controls.',
  'Terraform environments (dev/staging/prod) manage VPC, IAM, Redis, S3, and secrets.'
]

const videoPlatformHighlights = {
  admin: ['Admin dashboard built with React + Vite.', 'VideoUploadForm streams to Supabase Storage buckets.', 'Metadata persisted in videos_metadata table.'],
  frontend: ['VideoLibrary component fetches tutorials via Supabase client.', 'GA4 gtag events fire on video play.', 'CTA drives viewers to /book for easy conversion.'],
  env: ['VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY injected at build time.', 'Shared api-client package centralizes Supabase helpers.']
}

function TelecomArchitecturePage() {
  return (
    <main className="telecom-architecture-page">
      <section className="telecom-hero">
        <p className="telecom-eyebrow">Telecommunications System Architecture</p>
        <h1>Carrier-Grade Communications for Top Speed Appliance</h1>
        <p className="telecom-lede">
          A full-stack blueprint covering apps, APIs, telecom gateways, billing, and compliance so every repair request becomes a confirmed, dispatched, and completed job.
        </p>
        <div className="telecom-hero-actions">
          <a className="cta-button primary-btn" href="https://book.housecallpro.com/book/TopSpeed-Appliance/0c0fcb09005e47239b0bd7d487e9d468?v2=true" target="_blank" rel="noopener noreferrer">
            Book a Repair
          </a>
          <Link className="cta-button secondary-btn" to="/service-request">View Service Request Flow</Link>
        </div>
      </section>

      <section className="telecom-layer-section">
        <div className="telecom-section-heading">
          <h2>End-to-End Platform Layers</h2>
          <p>Client apps, REST services, gateways, and infrastructure form a single resilient network.</p>
        </div>
        <div className="telecom-layer-grid">
          {architectureLayers.map((layer) => (
            <article key={layer.title} className="telecom-layer-card">
              <span className="telecom-card-badge">{layer.badge}</span>
              <h3>{layer.title}</h3>
              <p>{layer.summary}</p>
              <ul>
                {layer.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="telecom-service-section">
        <div className="telecom-section-heading">
          <h2>Microservices & Responsibilities</h2>
          <p>Each service owns its data model, queue workers, and autoscaling policy.</p>
        </div>
        <div className="telecom-service-grid">
          {serviceCapabilities.map((service) => (
            <article key={service.name} className="telecom-service-card">
              <h3>{service.name}</h3>
              <ul>
                {service.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="telecom-endpoints-section">
        <div className="telecom-section-heading">
          <h2>Core API Surface</h2>
          <p>Standardized REST endpoints connect booking flows, telecom automation, and billing events.</p>
        </div>
        <div className="telecom-table-wrapper">
          <table className="telecom-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Purpose</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((endpoint) => (
                <tr key={`${endpoint.method}-${endpoint.path}`}>
                  <td>{endpoint.method}</td>
                  <td>{endpoint.path}</td>
                  <td>{endpoint.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="telecom-database-section">
        <div className="telecom-section-heading">
          <h2>Operational Data Model</h2>
          <p>PostgreSQL tables capture every customer touchpoint, telecom event, and financial record.</p>
        </div>
        <div className="telecom-database-grid">
          {databaseTables.map((table) => (
            <article key={table.name} className="telecom-database-card">
              <h3>{table.name}</h3>
              <ul>
                {table.columns.map((column) => (
                  <li key={column}>{column}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="telecom-workflow-section">
        <div className="telecom-section-heading">
          <h2>Mission-Critical Workflows</h2>
          <p>Every automation path is observable through telecom logs, analytics dashboards, and CRM updates.</p>
        </div>
        <div className="telecom-workflow-grid">
          {workflowMoments.map((workflow) => (
            <article key={workflow.title} className="telecom-workflow-card">
              <h3>{workflow.title}</h3>
              <ol>
                {workflow.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="telecom-vendors-section">
        <div className="telecom-section-heading">
          <h2>Telecom Providers & Gateways</h2>
          <p>Primary, fallback, and emergency carriers keep outbound messaging compliant and redundant.</p>
        </div>
        <div className="telecom-vendor-grid">
          {telecomVendors.map((vendor) => (
            <article key={vendor.name} className="telecom-vendor-card">
              <div className="telecom-vendor-header">
                <h3>{vendor.name}</h3>
                <span className="telecom-vendor-role">{vendor.role}</span>
              </div>
              <ul>
                {vendor.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="telecom-billing-section">
        <div className="telecom-section-heading">
          <h2>Billing & Usage Intelligence</h2>
          <p>Job-based charges, subscriptions, and usage logs share one Stripe-backed financial ledger.</p>
        </div>
        <div className="telecom-billing-grid">
          {billingHighlights.map((item) => (
            <article key={item.title} className="telecom-billing-card">
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="telecom-deployment-section">
        <div className="telecom-section-heading">
          <h2>Deployment & Infrastructure Pipeline</h2>
          <p>Terraform-managed environments, automated builds, and carrier integrations run on AWS + GCP.</p>
        </div>
        <ul className="telecom-deployment-list">
          {deploymentPipeline.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </section>

      <section className="telecom-video-section">
        <div className="telecom-section-heading">
          <h2>Video Knowledge Platform</h2>
          <p>Supabase-backed admin tooling keeps customer education videos in sync with the website.</p>
        </div>
        <div className="telecom-video-grid">
          <article className="telecom-video-card">
            <h3>Admin Dashboard</h3>
            <ul>
              {videoPlatformHighlights.admin.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="telecom-video-card">
            <h3>Customer-Facing Frontend</h3>
            <ul>
              {videoPlatformHighlights.frontend.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="telecom-video-card">
            <h3>Environment & Tooling</h3>
            <ul>
              {videoPlatformHighlights.env.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </section>

      <section className="telecom-cta-section">
        <div className="telecom-cta-card">
          <h2>Need a Carrier-Grade Appliance Repair Platform?</h2>
          <p>
            Our telecom fabric covers SMS, voice, IVR, push, payments, analytics, and CRM sync so you can focus on delivering excellent service across South Florida.
          </p>
          <div className="telecom-cta-actions">
            <a className="cta-button primary-btn" href="tel:9549317997">Call (954) 931-7997</a>
            <Link className="cta-button secondary-btn" to="/service-request">Submit a Service Request</Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TelecomArchitecturePage
