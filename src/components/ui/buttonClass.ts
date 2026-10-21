import styles from "./Button.module.css";

export type ButtonVariant = "default" | "primary" | "blue" | "green" | "coral";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonStyleProps {
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  iconOnly?: boolean | undefined;
}

export function buttonClass(
  { variant = "default", size = "medium", iconOnly = false }: ButtonStyleProps,
  extra?: string,
): string {
  return [
    styles.button,
    variant !== "default" && styles[variant],
    size !== "medium" && styles[size],
    iconOnly && styles.iconOnly,
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}

export const buttonIconClass = styles.icon;
