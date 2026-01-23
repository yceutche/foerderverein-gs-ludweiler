export default function Logo({ className = "h-10 w-auto", showText = false }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="h-full w-auto"
      >
        {/* Outer circle */}
        <circle cx="50" cy="50" r="48" fill="white" stroke="#333" strokeWidth="2" />
        <circle cx="50" cy="50" r="44" fill="white" stroke="#333" strokeWidth="1" />
        
        {/* Color splashes - decorative */}
        <ellipse cx="22" cy="25" rx="7" ry="5" fill="#00BCD4" opacity="0.85" />
        <ellipse cx="78" cy="22" rx="5" ry="4" fill="#E91E63" opacity="0.85" />
        <circle cx="75" cy="70" r="3" fill="#FF9800" opacity="0.85" />
        <circle cx="28" cy="68" r="2.5" fill="#4CAF50" opacity="0.85" />
        <circle cx="52" cy="20" r="2" fill="#E91E63" opacity="0.85" />
        
        {/* Hand 1 - Cyan (back left) */}
        <g transform="translate(20, 28) scale(0.55)">
          <path
            d="M10 70 L10 45 Q10 40 15 40 L20 40 Q25 40 25 45 L25 35 Q25 30 30 30 L35 30 Q40 30 40 35 L40 30 Q40 25 45 25 L50 25 Q55 25 55 30 L55 35 Q55 30 60 30 L65 30 Q70 30 70 35 L70 55 Q70 75 50 80 L30 80 Q10 80 10 70 Z"
            fill="#00BCD4"
            stroke="#00838F"
            strokeWidth="1"
          />
        </g>
        
        {/* Hand 2 - Orange (back right) */}
        <g transform="translate(48, 25) scale(0.52)">
          <path
            d="M10 70 L10 45 Q10 40 15 40 L20 40 Q25 40 25 45 L25 35 Q25 30 30 30 L35 30 Q40 30 40 35 L40 30 Q40 25 45 25 L50 25 Q55 25 55 30 L55 35 Q55 30 60 30 L65 30 Q70 30 70 35 L70 55 Q70 75 50 80 L30 80 Q10 80 10 70 Z"
            fill="#FF9800"
            stroke="#E65100"
            strokeWidth="1"
          />
        </g>
        
        {/* Hand 3 - Pink/Magenta (center-left) */}
        <g transform="translate(25, 32) scale(0.58)">
          <path
            d="M10 70 L10 45 Q10 40 15 40 L20 40 Q25 40 25 45 L25 35 Q25 30 30 30 L35 30 Q40 30 40 35 L40 30 Q40 25 45 25 L50 25 Q55 25 55 30 L55 35 Q55 30 60 30 L65 30 Q70 30 70 35 L70 55 Q70 75 50 80 L30 80 Q10 80 10 70 Z"
            fill="#E91E63"
            stroke="#AD1457"
            strokeWidth="1"
          />
        </g>
        
        {/* Hand 4 - Blue (front center) */}
        <g transform="translate(32, 38) scale(0.6)">
          <path
            d="M10 70 L10 45 Q10 40 15 40 L20 40 Q25 40 25 45 L25 35 Q25 30 30 30 L35 30 Q40 30 40 35 L40 30 Q40 25 45 25 L50 25 Q55 25 55 30 L55 35 Q55 30 60 30 L65 30 Q70 30 70 35 L70 55 Q70 75 50 80 L30 80 Q10 80 10 70 Z"
            fill="#2196F3"
            stroke="#1565C0"
            strokeWidth="1"
          />
        </g>
        
        {/* Hand 5 - Green (front right) */}
        <g transform="translate(45, 40) scale(0.55)">
          <path
            d="M10 70 L10 45 Q10 40 15 40 L20 40 Q25 40 25 45 L25 35 Q25 30 30 30 L35 30 Q40 30 40 35 L40 30 Q40 25 45 25 L50 25 Q55 25 55 30 L55 35 Q55 30 60 30 L65 30 Q70 30 70 35 L70 55 Q70 75 50 80 L30 80 Q10 80 10 70 Z"
            fill="#4CAF50"
            stroke="#2E7D32"
            strokeWidth="1"
          />
        </g>

        {/* Text paths for curved text */}
        <defs>
          <path id="textPathTop" d="M 12 50 A 38 38 0 0 1 88 50" fill="none" />
          <path id="textPathBottom" d="M 20 55 A 30 30 0 0 0 80 55" fill="none" />
        </defs>
        
        {/* Curved text - top */}
        <text fontSize="5.8" fontWeight="600" fill="#333" fontFamily="Arial, sans-serif">
          <textPath href="#textPathTop" startOffset="50%" textAnchor="middle">
            Förderverein der Grundschule Ludweiler-Lauterbach
          </textPath>
        </text>
        {/* Curved text - bottom */}
        <text fontSize="6.5" fontWeight="600" fill="#333" fontFamily="Arial, sans-serif">
          <textPath href="#textPathBottom" startOffset="50%" textAnchor="middle">
            Standort Ludweiler e.V.
          </textPath>
        </text>
      </svg>
      
      {showText && (
        <span className="font-semibold text-gray-900 leading-tight hidden sm:block">
          <span className="block text-sm text-primary-600">Förderverein</span>
          <span className="block">GS Ludweiler</span>
        </span>
      )}
    </div>
  )
}

// Simplified logo for small sizes (favicon, etc.)
export function LogoSimple({ className = "h-8 w-8" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="20" cy="20" r="19" fill="white" stroke="#333" strokeWidth="1" />
      {/* Simplified hands */}
      <path d="M8 28 L8 18 L12 14 L12 28 Z" fill="#00BCD4" />
      <path d="M12 26 L12 16 L16 12 L16 26 Z" fill="#E91E63" />
      <path d="M16 24 L16 14 L20 10 L20 24 Z" fill="#FF9800" />
      <path d="M20 26 L20 16 L24 12 L24 26 Z" fill="#2196F3" />
      <path d="M24 28 L24 18 L28 14 L28 28 Z" fill="#4CAF50" />
    </svg>
  )
}
