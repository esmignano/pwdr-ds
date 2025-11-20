// packages/tokens/src/utils/token.ts

import { systemTokens } from "../system/index.sys";
import { referenceTokens } from "../reference/index.ref";
import { mixinTokens } from "../mixins/index.mxn";

export type PwdrThemeKey = "light" | "dark";

function getDeep(obj: any, path: string): any {
  return path.split(".").reduce(
    (acc, key) => (acc && acc[key] != null ? acc[key] : undefined),
    obj
  );
}

// ---- System tokens (pwdr.sys.*) --------------------------

export function getSysTokenValue(path: string): string | undefined {
  const node = getDeep(systemTokens, path) as { value?: string } | undefined;
  return node?.value;
}

// ---- Reference tokens (pwdr.ref.*) ----------------------

export function getRefTokenValue(
  path: string,
  theme: PwdrThemeKey = "light"
): string | undefined {
  const node = getDeep(referenceTokens, path) as any;
  if (!node) return undefined;

  const base = node.value as string | undefined;
  const darkVal = node.dark?.value as string | undefined;

  let val = base;
  if (theme === "dark" && darkVal && darkVal !== "None") {
    val = darkVal;
  }

  if (!val) return undefined;

  // CASE 1: value points to a system token
  if (val.startsWith("pwdr.sys.")) {
    const trimmed = val.replace("pwdr.sys.", ""); // e.g. "color.palette.neutral.050"
    return getSysTokenValue(trimmed);
  }

  // CASE 2: value points to another ref token (recursive)
  if (val.startsWith("pwdr.ref.")) {
    const next = val.replace("pwdr.ref.", ""); // e.g. "color.border.default"
    return getRefTokenValue(next, theme);
  }

  // CASE 3: already raw (hex, px, rem, etc.)
  return val;
}

// ---- Mixin tokens (pwdr.mxn.*) --------------------------

function getMixinTokenValue(
  path: string,
  theme: PwdrThemeKey = "light"
): string | undefined {
  const node = getDeep(mixinTokens, path) as any;
  if (!node) return undefined;

  const val = node.value as string | undefined;
  if (!val) return undefined;

  // Mixins always point to other tokens (ref/sys), so just reuse token()
  if (val.startsWith("pwdr.")) {
    return token(val, { theme });
  }

  // If one day a mixin property is a raw value:
  return val;
}

// ---- Public API -----------------------------------------

export function token(
  fullName: string,
  options?: { theme?: PwdrThemeKey },
  fallback?: string
): string {
  const theme = options?.theme ?? "light";

  // System tokens
  if (fullName.startsWith("pwdr.sys.")) {
    const path = fullName.slice("pwdr.sys.".length);
    return getSysTokenValue(path) ?? fallback ?? "";
  }

  // Reference tokens
  if (fullName.startsWith("pwdr.ref.")) {
    const path = fullName.slice("pwdr.ref.".length);
    return getRefTokenValue(path, theme) ?? fallback ?? "";
  }

  // Mixin tokens – leaf properties like:
  // "pwdr.mxn.typography.title.xxxl.upper.font-size"
  if (fullName.startsWith("pwdr.mxn.")) {
    const path = fullName.slice("pwdr.mxn.".length);
    return getMixinTokenValue(path, theme) ?? fallback ?? "";
  }

  // Fallback: try as ref, then sys, then mixin (for short paths)
  const refResult = getRefTokenValue(fullName, theme);
  if (refResult != null) return refResult;

  const sysResult = getSysTokenValue(fullName);
  if (sysResult != null) return sysResult;

  const mixinResult = getMixinTokenValue(fullName, theme);
  if (mixinResult != null) return mixinResult;

  return fallback ?? "";
}

// Convenience helper: resolve a full mixin object to CSS-ready props
export function mixin(
  fullName: string,
  options?: { theme?: PwdrThemeKey }
): Record<string, string> {
  const theme = options?.theme ?? "light";

  if (!fullName.startsWith("pwdr.mxn.")) {
    throw new Error(
      `mixin() expects a mixin name starting with "pwdr.mxn.", got "${fullName}"`
    );
  }

  const path = fullName.slice("pwdr.mxn.".length); // e.g. "typography.title.xxxl.upper"
  const node = getDeep(mixinTokens, path) as any;

  if (!node || typeof node !== "object") {
    return {};
  }

  const result: Record<string, string> = {};

  for (const [prop, leaf] of Object.entries(node)) {
    const val = (leaf as any).value as string | undefined;

    if (!val) continue;

    if (val.startsWith("pwdr.")) {
      result[prop] = token(val, { theme });
    } else {
      result[prop] = val;
    }
  }

  return result;
}
