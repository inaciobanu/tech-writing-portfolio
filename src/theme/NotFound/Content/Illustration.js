import React from 'react';

// A small schematic diagram in the same style as the architecture diagrams
// elsewhere on the site (docs/process-governance) – a requested URL with no
// route to a page, rather than a mascot.
export default function Illustration() {
  return (
    <svg
      viewBox="0 0 520 160"
      width="100%"
      style={{maxWidth: 420, display: 'block', margin: '0 auto 1.5rem'}}
      fontFamily="system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
      role="img"
      aria-label="Diagram: the requested URL has no matching route, resulting in a 404">
      {/* requested URL */}
      <rect x="20" y="50" width="180" height="60" rx="10" fill="#EAF1FC" stroke="#BBD3F5" strokeWidth="1.5" />
      <text x="110" y="76" fontSize="13" fontWeight="700" fill="#2154C9" textAnchor="middle">Requested URL</text>
      <text x="110" y="95" fontSize="11" fill="#5B6B82" textAnchor="middle">/docs/…</text>

      {/* broken route */}
      <line x1="200" y1="80" x2="235" y2="80" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="6,4" />
      <text x="260" y="66" fontSize="12" fontWeight="700" fill="#B91C1C" textAnchor="middle">404</text>
      <line x1="285" y1="80" x2="320" y2="80" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="6,4" />

      {/* no matching page */}
      <rect x="320" y="50" width="180" height="60" rx="10" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1.5" strokeDasharray="6,4" />
      <text x="410" y="76" fontSize="13" fontWeight="700" fill="#B91C1C" textAnchor="middle">No matching page</text>
      <text x="410" y="95" fontSize="11" fill="#C2837E" textAnchor="middle">route not found</text>
    </svg>
  );
}
