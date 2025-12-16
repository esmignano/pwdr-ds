import * as React from "react";
import { token } from "@pwdr/tokens";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  theme?: "light" | "dark" | "high-contrast";
};

function px(n: number) {
  return `${n}px`;
}

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  disabled,
  fullWidth = false,
  theme = "light",
  children,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  // ---- Tokens (examples; adjust names to your real tokens) ----
  const radius = token("pwdr.ref.shape.radius.md", { theme }) ?? "12px";

  // spacing tokens (fallbacks keep component usable while tokens evolve)
  const padY =
    size === "sm"
      ? token("pwdr.ref.spacing.100", { theme })
      : size === "lg"
        ? token("pwdr.ref.spacing.200", { theme })
        : token("pwdr.ref.spacing.150", { theme });

  const padX =
    size === "sm"
      ? token("pwdr.ref.spacing.200", { theme })
      : size === "lg"
        ? token("pwdr.ref.spacing.400", { theme })
        : token("pwdr.ref.spacing.300", { theme });

  const font = token(
    size === "sm"
      ? "pwdr.mxn.typography.body.sm"
      : size === "lg"
        ? "pwdr.mxn.typography.body.lg"
        : "pwdr.mxn.typography.body.md",
    { theme }
  );

  // Color tokens per variant
  const bg =
    variant === "primary"
      ? token("pwdr.ref.color.surface.active", { theme })
      : variant === "secondary"
        ? token("pwdr.ref.color.surface.default", { theme })
        : "transparent";

  const fg =
    variant === "primary"
      ? token("pwdr.ref.color.text.on-surface-active", { theme })
      : variant === "secondary"
        ? token("pwdr.ref.color.text.active", { theme })
        : token("pwdr.ref.color.text.active", { theme });

  const border =
    variant === "ghost"
      ? `1px solid ${token("pwdr.ref.color.border.default", { theme }) ?? "currentColor"}`
      : `1px solid ${token("pwdr.ref.color.border.subtle", { theme }) ?? "transparent"}`;

  const shadow =
    variant === "primary"
      ? token("pwdr.ref.elevation.surface.rest", { theme }) // could be string "0px 0px 4px 0px #..."
      : "none";

  // Focus ring
  const focusRing = token("pwdr.ref.color.focus-ring", { theme }) ?? "rgba(102,102,255,0.6)";

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: px(8),
    width: fullWidth ? "100%" : undefined,

    borderRadius: radius,
    border,
    background: bg,
    color: fg,
    boxShadow: shadow,

    padding: `${padY ?? "10px"} ${padX ?? "14px"}`,
    cursor: isDisabled ? "not-allowed" : "pointer",
    opacity: isDisabled ? 0.6 : 1,

    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    transition: "transform 120ms ease, box-shadow 120ms ease, opacity 120ms ease",

    // typography mixin returns a prop-map (e.g. {"font-family": "...", "font-size": "..."} )
    ...(typeof font === "object" ? (font as React.CSSProperties) : null),

    ...style
  };

  return (
    <button
      type="button"
      aria-busy={loading || undefined}
      disabled={isDisabled}
      style={baseStyle}
      onMouseDown={(e) => {
        // small “press” affordance
        if (!isDisabled) (e.currentTarget.style.transform = "translateY(1px)");
        rest.onMouseDown?.(e);
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        rest.onMouseUp?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        rest.onBlur?.(e);
      }}
      {...rest}
    >
      {loading ? "Loading…" : children}
      {/* inline focus ring without CSS file */}
      <style>{`
        button:focus-visible {
          outline: 3px solid ${focusRing};
          outline-offset: 2px;
        }
      `}</style>
    </button>
  );
}
