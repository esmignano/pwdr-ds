import * as React from "react";
import {
  Button as AriaButton,
  ButtonProps as AriaButtonProps,
  PressEvent,
} from "react-aria-components";
import { useTokens } from "@pwdr/tokens";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Discovery = "discovery",
  Alert = "alert",
  Warning = "warning",
  Success = "success",
  Disabled = "disabled",
}

export type ButtonSize = "small" | "standard";

export type ButtonProps = Omit<AriaButtonProps, "type" | "onPress"> & {
  type?: ButtonType | string;
  size?: ButtonSize;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (e: PressEvent) => void;
  htmlType?: AriaButtonProps["type"];
  style?: React.CSSProperties;
  children?: React.ReactNode | string;
};

export default function Button(props: ButtonProps) {
  const {
    children = "",
    className = "",
    disabled = false,
    size = "standard",
    type = ButtonType.Primary,
    isLoading = false,
    onClick,
    style,
    htmlType = "button",
    ...rest
  } = props;

  const variant = type.toString().toLowerCase();
  const isDisabled = disabled || variant === "disabled" || isLoading;

  const handlePress = (e: PressEvent) => {
    if (isDisabled) return;
    onClick?.(e);
  };

  /* ----------------------------
   * Tokens (theme from PwdrProvider)
   * ---------------------------- */

  const radius = useToken("pwdr.ref.shape.radius.md");

  const paddingY =
    size === "small"
      ? useToken("pwdr.ref.spacing.100")
      : useToken("pwdr.ref.spacing.150");

  const paddingX =
    size === "small"
      ? useToken("pwdr.ref.spacing.200")
      : useToken("pwdr.ref.spacing.300");

  const typography =
    size === "small"
      ? useToken("pwdr.mxn.typography.body.sm")
      : useToken("pwdr.mxn.typography.body.md");

  const background =
    variant === "primary"
      ? useToken("pwdr.ref.color.surface.active")
      : variant === "secondary"
        ? useToken("pwdr.ref.color.surface.default")
        : "transparent";

  const color =
    variant === "primary"
      ? useToken("pwdr.ref.color.text.on-surface-active")
      : useToken("pwdr.ref.color.text.active");

  const borderColor =
    variant === "tertiary"
      ? useToken("pwdr.ref.color.border.default")
      : "transparent";

  const focusRing =
    useToken("pwdr.ref.color.focus-ring") ?? "rgba(102, 102, 255, 0.6)";

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    padding: `${paddingY} ${paddingX}`,
    borderRadius: radius,
    border: `1px solid ${borderColor}`,
    background,
    color,

    opacity: isDisabled ? 0.6 : 1,
    cursor: isDisabled ? "not-allowed" : "pointer",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",

    transition:
      "background 120ms ease, box-shadow 120ms ease, transform 120ms ease",

    ...(typeof typography === "object" ? (typography as React.CSSProperties) : null),
  };

  return (
    <AriaButton
      {...rest}
      type={htmlType}
      isDisabled={isDisabled}
      onPress={handlePress}
      className={[
        "Button",
        variant,
        size === "small" && "small",
        isLoading && "loading",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-busy={isLoading || undefined}
      style={(render) => ({
        ...baseStyle,
        ...(render.isPressed && !isDisabled ? { transform: "translateY(1px)" } : null),
        ...(render.isFocusVisible
          ? {
              outline: `3px solid ${focusRing}`,
              outlineOffset: 2,
            }
          : null),
        ...style,
      })}
    >
      {!isLoading ? children : <span aria-hidden="true">Loading…</span>}
    </AriaButton>
  );
}
