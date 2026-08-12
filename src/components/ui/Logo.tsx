import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 40 40"
        className="h-10 w-10"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="legacy-grad" x1="0" y1="0" x2="40" y2="40">
            <stop offset="0%" stopColor="oklch(0.62 0.2 292)" />
            <stop offset="100%" stopColor="oklch(0.76 0.13 205)" />
          </linearGradient>
        </defs>
        {/* Stacked "L" — layered strokes suggesting building on knowledge */}
        <path
          d="M11 8 v18 a2 2 0 0 0 2 2 h16"
          stroke="url(#legacy-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19 8 v10"
          stroke="url(#legacy-grad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <span className="text-2xl font-semibold tracking-tight">Legacy</span>
    </div>
  );
}