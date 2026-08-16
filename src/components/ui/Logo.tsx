import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end", className)}>
      {/* Glyph = the "L", flush to EGACY */}
      <LogoMark className="-mr-1.5 h-9 w-9 shrink-0 translate-y-[0%]" />

      <span className="font-sans text-2xl font-bold tracking-tight text-[var(--color-text)]">
        EGACY
      </span>
    </div>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 480"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="bookGrad"
          gradientUnits="userSpaceOnUse"
          x1="90"
          y1="45"
          x2="415"
          y2="425"
        >
          <stop offset="0%" stopColor="#a468f2" />
          <stop offset="28%" stopColor="#8a5cf0" />
          <stop offset="52%" stopColor="#5f86e8" />
          <stop offset="76%" stopColor="#34b8e2" />
          <stop offset="100%" stopColor="#25d8dc" />
        </linearGradient>
      </defs>

      <g
        fill="url(#bookGrad)"
        stroke="#0b0b1f"
        strokeWidth="6"
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M103,64 L120,54 L152,300 L134,308 Z" />
        <path d="M126,58 L166,50 L191,282 C191,292 182,301 170,301 L142,301 Z" />
        <path d="M120,314 C130,352 147,382 180,400 L177,422 C140,402 121,362 111,324 Z" />
        <path d="M182,316 C264,298 348,302 408,328 L402,348 C344,325 264,321 186,340 Z" />
        <path d="M186,346 C264,328 344,332 401,356 L394,378 C338,353 262,350 190,368 Z" />
        <path d="M190,374 C262,356 334,360 392,384 L383,408 C330,383 258,380 194,398 Z" />
      </g>
    </svg>
  );
}
