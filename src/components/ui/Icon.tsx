const PATHS = {
  arrowLeft: "M19 12H5m6-6-6 6 6 6",
  arrowRight: "M5 12h14m-6-6 6 6-6 6",
  arrowUp: "M12 19V5m-6 6 6-6 6 6",
  arrowDown: "M12 5v14m6-6-6 6-6-6",
  play: "M7 4.5v15l12-7.5z",
  pause: "M8 5v14M16 5v14",
  copy: "M9 9h11v11H9zM5 15H4V4h11v1",
  check: "m4.5 12.5 5 5 10-11",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  refresh: "M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6",
  trash: "M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
  pin: "M8 3h8M9.5 3v6.5L6 14h12l-3.5-4.5V3M12 14v7",
  bulb: "M9.5 21h5M9 17.5h6M9 14.5a5.5 5.5 0 1 1 6 0c-.6.5-.9 1.2-.9 2.2V17.5H9.9v-.8c0-1-.3-1.7-.9-2.2z",
  rocket:
    "M13.5 5.5C16 3 21 3 21 3s0 5-2.5 7.5L13 16l-5-5zM9.5 9.5H5L3 12.5h4.5M14.5 14.5V19l-3 2v-4.5M7 17l-3 3M15.5 8.5h.01",
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps {
  name: IconName;
  className?: string | undefined;
  label?: string | undefined;
}

export function Icon({ name, className, label }: IconProps) {
  const filled = name === "play";
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 2 : 2.75}
      strokeLinecap="square"
      strokeLinejoin="miter"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
