import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  captureReferralCode,
  resolveReferral,
  fetchLeaderboard,
  SERVICE_OS_LINKS,
  withAttribution,
  useAttributionSearch,
} from '../lib/serviceOs'

/**
 * Refer & Earn — ApplianceReferral by Top Speed, on topspeedappliance.net.
 *
 * The program runs on the Service OS (one backend): a referral code is
 * issued when a customer's job completes, bookings made with the code
 * are attributed automatically, and credit lands after staff approval.
 * Terms shown here are the approved, published program terms. Two
 * different $25s, kept distinct on purpose:
 *  - the REFERRER earns a $25 service CREDIT per completed referral
 *    (rising to $35, then $50, plus milestone bonuses), and
 *  - the FRIEND gets $25 OFF their first eligible repair (the published
 *    welcome offer for new registered customers).
 * Businesses and property managers refer on the partner track — same
 * terms, tracked separately, no separate partner rate.
 */
export default function ReferPage() {
  const attrQs = useAttributionSearch()
  const [referredBy, setReferredBy] = useState(null)
  const [leaders, setLeaders] = useState(null)

  useEffect(() => {
    const code = captureReferralCode()
    if (code) {
      resolveReferral(code).then((info) => {
        if (info && info.valid) setReferredBy(info)
      })
    }
    fetchLeaderboard().then((data) => {
      setLeaders((data && data.leaders) || [])
    })
  }, [])

  return (
    <div className="os-page">
      <div className="os-wrap">
        <div className="os-book-head">
          <div>
            <h1 className="os-h1" style={{ fontSize: 30 }}>
              Refer &amp; Earn — ApplianceReferral by Top Speed
            </h1>
            <p className="os-sub">
              Good neighbors tell good neighbors. Share your personal referral code, your friend
              books and completes a repair, and you earn real service credit toward your next visit.
            </p>
          </div>
        </div>

        {referredBy ? (
          <div
            className="os-form-card"
            style={{ borderLeft: '4px solid #1280ff', marginBottom: 18 }}
            role="status"
          >
            <h2 className="os-form-title" style={{ marginTop: 0 }}>
              {referredBy.referrerFirstName} sent you 👋
            </h2>
            <p style={{ margin: 0 }}>
              Your welcome offer is waiting: <strong>$25 off your first eligible repair</strong> —
              for new registered customers. Book below and your booking stays tagged to{' '}
              {referredBy.referrerFirstName}&rsquo;s code automatically, so they earn their credit
              when your job completes.
            </p>
          </div>
        ) : null}

        <div className="os-form-card" style={{ marginBottom: 18 }}>
          <h2 className="os-form-title" style={{ marginTop: 0 }}>How it works</h2>
          <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.65 }}>
            <li>
              <strong>Get your code.</strong> When your repair job completes, your personal referral
              code is issued to your account automatically.
            </li>
            <li>
              <strong>Share your link.</strong> Send it to a friend, neighbor, tenant, or another
              business in South Florida.
            </li>
            <li>
              <strong>They book &amp; complete.</strong> Their booking carries your code the whole
              way — no forms to chase.
            </li>
            <li>
              <strong>You earn credit.</strong> After a quick staff approval, service credit lands
              on your account. Track every stage in your referral dashboard.
            </li>
          </ol>
        </div>

        <div className="os-form-card" style={{ marginBottom: 18 }}>
          <h2 className="os-form-title" style={{ marginTop: 0 }}>The approved terms</h2>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.65 }}>
            <li>
              <strong>$25 service credit</strong> for each referral whose job is completed and paid.
            </li>
            <li>
              From your 5th through your 9th completed referral, the credit rises to{' '}
              <strong>$35 each</strong>; from your 10th on, <strong>$50 each</strong>.
            </li>
            <li>
              One-time milestone bonuses: <strong>$100 at 10</strong> lifetime referrals and{' '}
              <strong>$250 at 25</strong>.
            </li>
            <li>Every credit is approved by our team before it lands, and expires 12 months after it is issued.</li>
            <li>
              Your friend gets a welcome offer of their own: <strong>$25 off their first eligible
              repair</strong> (new registered customers; minimum service charge and exclusions apply).
            </li>
            <li>
              <strong>Businesses &amp; property managers:</strong> you refer on the partner track —
              the same terms above, tracked separately, with your code and stats in Appliance Pro
              (businesses) or Appliance Connect Pro (property managers). No separate partner rate.
            </li>
          </ul>
        </div>

        <div className="os-form-card" style={{ marginBottom: 18 }}>
          <h2 className="os-form-title" style={{ marginTop: 0 }}>Top referrers</h2>
          {leaders === null ? (
            <p style={{ margin: 0 }}>Loading the board…</p>
          ) : leaders.length === 0 ? (
            <p style={{ margin: 0 }}>
              The program just launched — no completed referrals yet. Be the first name on this
              board: finish a job, share your code, and when your friend&rsquo;s repair completes,
              you&rsquo;re on it. Names show as first name + last initial; credit amounts stay private.
            </p>
          ) : (
            <ol style={{ margin: 0, paddingLeft: 20, lineHeight: 1.65 }}>
              {leaders.map((leader) => (
                <li key={leader.displayName}>
                  <strong>{leader.displayName}</strong> — {leader.completedReferrals}{' '}
                  {leader.completedReferrals === 1 ? 'completed referral' : 'completed referrals'}
                </li>
              ))}
            </ol>
          )}
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to={withAttribution('/service-request', attrQs)} className="os-btn os-btn-red">
            Book Service
          </Link>
          <a href={SERVICE_OS_LINKS.signup} className="os-btn">
            Create account
          </a>
          <a href={SERVICE_OS_LINKS.refer} className="os-btn">
            Open your Refer &amp; Earn dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
