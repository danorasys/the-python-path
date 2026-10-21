import type { ComponentPropsWithRef } from "react";
import { Link, type LinkProps } from "react-router";
import { buttonClass, type ButtonStyleProps } from "./buttonClass";

type ButtonProps = ComponentPropsWithRef<"button"> & ButtonStyleProps;

export function Button({
  variant,
  size,
  iconOnly,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClass({ variant, size, iconOnly }, className)}
      {...rest}
    />
  );
}

type ButtonLinkProps = LinkProps & ButtonStyleProps;

export function ButtonLink({ variant, size, iconOnly, className, ...rest }: ButtonLinkProps) {
  return <Link className={buttonClass({ variant, size, iconOnly }, className)} {...rest} />;
}

type ButtonAnchorProps = ComponentPropsWithRef<"a"> & ButtonStyleProps;

export function ButtonAnchor({ variant, size, iconOnly, className, ...rest }: ButtonAnchorProps) {
  return <a className={buttonClass({ variant, size, iconOnly }, className)} {...rest} />;
}
