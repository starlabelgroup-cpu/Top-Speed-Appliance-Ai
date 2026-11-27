// Top Speed Racing — motif components for the topspeedappliance.net superapp (React/Vite).
// Drop-in: copy this file into src/components/ and import what a surface needs.
// Design language: Deep Navy #0C1B31 + Signal Red #E94E5C, designed SVG only, no emoji.
// Static-file alternative: the same artwork ships as files in ../assets/brand/ (fleet-*.svg,
// shield-badge.svg, stoplight.svg, ts-racing-icons.svg) for <img> use or public/ serving.

const NAVY = "#0C1B31";
const NAVY2 = "#1E4066";
const RED = "#E94E5C";
const ICE = "#D7E3F0";
const AMBER = "#F2A93B";
const GREEN = "#1F9D63";

export function ShieldBadge({ size = 44, title = "Top Speed racing shield" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" role="img" aria-label={title}>
      <path fill={NAVY} d="M24 3l14.5 5v11.2c0 9.4-6 16.4-14.5 20.3C15.5 35.6 9.5 28.6 9.5 19.2V8z" />
      <path fill="none" stroke={RED} strokeWidth="2" d="M24 6.6l11 3.8v8.8c0 7.6-4.8 13.3-11 16.4-6.2-3.1-11-8.8-11-16.4V10.4z" />
      <path fill="#fff" d="M25.8 12.5L18 24.2h4.9L21.4 33 30.4 20.6h-5z" />
    </svg>
  );
}

export function Stoplight({ height = 82, lit = "green" }) {
  return (
    <svg height={height} viewBox="0 0 40 96" role="img" aria-label="Stop light — red light to green light">
      <rect x="6" y="4" width="28" height="88" rx="13" fill={NAVY} />
      <rect x="6" y="4" width="28" height="88" rx="13" fill="none" stroke={NAVY2} strokeWidth="2" />
      <circle cx="20" cy="22" r="8.5" fill={RED} opacity={lit === "red" ? 1 : 0.9} />
      <circle cx="20" cy="48" r="8.5" fill={AMBER} opacity={lit === "amber" ? 1 : 0.38} />
      <circle cx="20" cy="74" r="8.5" fill={GREEN} />
      {lit === "green" && <circle cx="20" cy="74" r="13" fill="none" stroke={GREEN} strokeWidth="2" opacity=".55" />}
    </svg>
  );
}

// Line icons — same 24x24 stroke system as ts-racing-icons.svg.
const PATHS = {
  bolt: <path d="M13 2L4.5 13.5H11L9.5 22 19 10h-6.5L13 2z" />,
  gauge: (<><circle cx="12" cy="13" r="8" /><path d="M12 13l3.5-3.5" /><path d="M5 19h14" /></>),
  "checker-flag": (<><path d="M5 21.5v-19" /><path d="M5 3h13v9H5z" /><path d="M9.3 3v9M13.7 3v9M5 7.5h13" strokeWidth="1.1" /><path d="M5 3h4.3v4.5H5zM13.7 7.5H18V12h-4.3z" fill="currentColor" stroke="none" /></>),
  stoplight: (<><rect x="8" y="2.5" width="8" height="19" rx="3.5" /><circle cx="12" cy="7" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" /></>),
  shield: (<><path d="M12 3l7 2.4V11c0 4.6-2.9 7.9-7 9.7C7.9 18.9 5 15.6 5 11V5.4z" /><path d="M12.6 7.2L9.4 12h2.2l-.9 3.6L14 11h-2.1z" fill="currentColor" stroke="none" /></>),
  road: (<><path d="M4.5 21L9.5 3M19.5 21L14.5 3" /><path d="M12 18.2v-2.4M12 13.4V11M12 8.2V6" strokeWidth="1.8" /></>),
  sign: (<><path d="M12 21.5V11" /><path d="M4 3.5h12.5L20 7l-3.5 3.5H4z" /><path d="M7.5 7h6" strokeWidth="1.6" /></>),
  stripes: (<><path d="M3 7h11M3 12h14M3 17h11" /><path d="M17.5 7.5L21 12l-3.5 4.5" strokeWidth="1.8" /></>),
  laurels: (<><path d="M7.2 20.2C4.8 16.9 4.2 12.6 5.6 8.6M16.8 20.2c2.4-3.3 3-7.6 1.6-11.6" /><path d="M5.8 15.5l-2.6-.9M6 11.5L3.6 10M7 7.8L5 5.6M18.2 15.5l2.6-.9M18 11.5l2.4-1.5M17 7.8l2-2.2" strokeWidth="1.6" /><path d="M8.5 20.5h7" strokeWidth="1.6" /></>),
  tools: <path d="M13.8 5.2a3.6 3.6 0 0 1 4.9-3.4L16.4 4l2.1 2.1 2.3-2.2a3.6 3.6 0 0 1-4.8 4.8L8.6 16a1.8 1.8 0 0 1-2.5-2.5z" />,
  wrench: <path d="M14.5 6.5a4.2 4.2 0 0 1 5.6-4L17.5 5l2.5 2.5 2.6-2.5a4.2 4.2 0 0 1-5.5 5.6L8 19.7a2.1 2.1 0 0 1-3-3l9.5-10.2z" />,
};

export function RacingIcon({ name, size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

// The Speed Fleet strip — the ONE fleet moment per page (see BRAND-MOTIFS.md restraint rules).
// Uses the static emblem files; serve ../assets/brand/ from public/ or bundle via import.
const FLEET = [
  ["fleet-f1", "Formula 1"], ["fleet-stallion", "Race Stallion"], ["fleet-cheetah", "Cheetah"],
  ["fleet-jet", "Fighter Jet"], ["fleet-speedboat", "Speedboat"], ["fleet-spaceship", "Spaceship"],
];

export function FleetStrip({ basePath = "/assets/brand" }) {
  return (
    <section className="ts-fleet" aria-label="The Top Speed fleet">
      <p className="ts-fleet-eyebrow">The Top Speed fleet</p>
      <h2>Six machines. One standard: fast.</h2>
      <div className="ts-fleet-grid">
        {FLEET.map(([f, n]) => (
          <figure key={f} className="ts-fleet-tile">
            <img src={`${basePath}/${f}.svg`} alt="" aria-hidden="true" width="96" height="64" />
            <figcaption>{n}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
