const BLUE_SNAKE = "M42 12H25A9 9 0 0 0 16 21V29A9 9 0 0 0 25 38H36";
const YELLOW_SNAKE = "M22 52H39A9 9 0 0 0 48 43V35A9 9 0 0 0 39 26H28";
const OUTLINE_WIDTH = 15;
const BODY_WIDTH = 9;

export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        <g transform="translate(3 3)" stroke="var(--color-ink)" strokeWidth={OUTLINE_WIDTH}>
          <path d={BLUE_SNAKE} />
          <path d={YELLOW_SNAKE} />
        </g>
        <path d={BLUE_SNAKE} stroke="var(--color-ink)" strokeWidth={OUTLINE_WIDTH} />
        <path d={BLUE_SNAKE} stroke="var(--color-blue)" strokeWidth={BODY_WIDTH} />
        <path d={YELLOW_SNAKE} stroke="var(--color-ink)" strokeWidth={OUTLINE_WIDTH} />
        <path d={YELLOW_SNAKE} stroke="var(--color-yellow)" strokeWidth={BODY_WIDTH} />
      </g>
      <circle cx="40.5" cy="11.5" r="2.2" fill="var(--color-ink)" />
      <circle cx="23.5" cy="52.5" r="2.2" fill="var(--color-ink)" />
    </svg>
  );
}
