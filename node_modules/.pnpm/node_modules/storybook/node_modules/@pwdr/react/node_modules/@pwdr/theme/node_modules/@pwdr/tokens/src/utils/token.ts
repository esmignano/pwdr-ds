// packages/tokens/src/utils/token.ts
import sysColor from "../system/color.json";
import refColor from "../reference/color.json";

export type PwdrThemeKey = "light" | "dark";

function getDeep(obj: any, path: string): any {
  return path.split(".").reduce(
    (acc, key) => (acc && acc[key] != null ? acc[key] : undefined),
    obj
  );
}

// Expects a *trimmed* path like "color.palette.neutral.050"
export function getSysColor(path: string): string | undefined {
  const node = getDeep(sysColor, path) as { value?: string } | undefined;
  return node?.value;
}

// Expects a *trimmed* path like "color.border.default"
export function getRefColor(
  path: string,
  theme: PwdrThemeKey = "light"
): string | undefined {
  const node = getDeep(refColor, path) as any;
  if (!node) return undefined;

  const baseValue = node.value as string;
  const darkValue = node.dark?.value as string | undefined;

  // baseValue / darkValue are sys token names like "pwdr.sys.color.palette.neutral.050"
  const sysTokenName =
    theme === "dark" && darkValue ? darkValue : baseValue;

  const segs = sysTokenName.split(".");
  const trimmed =
    segs[0] === "pwdr" && segs[1] === "sys"
      ? segs.slice(2).join(".")
      : sysTokenName;

  return getSysColor(trimmed);
}

/**
 * Resolve a token by its full canonical name.
 *
 * - System:   token("pwdr.sys.color.palette.neutral.050")
 * - Reference: token("pwdr.ref.color.border.default", { theme: "dark" })
 */
export function token(
  fullName: string,
  options?: { theme?: PwdrThemeKey },
  fallback?: string
): string {
  const theme = options?.theme ?? "light";

  if (fullName.startsWith("pwdr.sys.")) {
    const path = fullName.slice("pwdr.sys.".length); // "color.palette.neutral.050"
    return getSysColor(path) ?? fallback ?? "";
  }

  if (fullName.startsWith("pwdr.ref.")) {
    const path = fullName.slice("pwdr.ref.".length); // "color.border.default"
    return getRefColor(path, theme) ?? fallback ?? "";
  }

  // If someone passes a short path, you can choose how to handle it.
  // Here we default to treating it as a ref token path:
  const refResult = getRefColor(fullName, theme);
  if (refResult != null) return refResult;

  const sysResult = getSysColor(fullName);
  if (sysResult != null) return sysResult;

  return fallback ?? "";
}
