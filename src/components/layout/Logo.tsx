export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect
        x="3"
        y="3"
        width="58"
        height="58"
        rx="12"
        fill="var(--color-yellow)"
        stroke="var(--color-ink)"
        strokeWidth="5"
      />
      <path
        d="M19 45V36a7 7 0 0 1 7-7h12a7 7 0 0 0 7-7v-3"
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 45V36a7 7 0 0 1 7-7h12a7 7 0 0 0 7-7v-3"
        fill="none"
        stroke="var(--color-blue)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="45" cy="18" r="5" fill="var(--color-ink)" />
    </svg>
  );
}
