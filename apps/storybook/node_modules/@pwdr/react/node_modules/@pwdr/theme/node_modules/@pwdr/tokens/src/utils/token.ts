// packages/tokens/src/utils/token.ts

import { systemTokens } from "../system/index.sys";
import { referenceTokens } from "../reference/index.ref";
import { mixinTokens } from "../mixins/index.mxn";

/**
 * Theme keys:
 * - "light" uses the base `value`
 * - any other theme (e.g. "dark", "high-contrast") will use that theme override
 *   when present, otherwise falls back to base `value`.
 */
export type PwdrThemeKey = "light" | "dark" | "high-contrast";

type TokenOptions = {
  theme?: PwdrThemeKey | string;
};

function normalizeTheme(theme: string | undefined): PwdrThemeKey {
  const t = (theme ?? "light").toLowerCase().trim();
  if (t === "dark") return "dark";
  if (t === "high-contrast" || t === "highcontrast" || t === "hc") return "high-contrast";
  return "light";
}

/**
 * Safely read a deep path like "color.palette.neutral.050" off an object.
 */
function getDeep(obj: any, path: string): any {
  return path.split(".").reduce(
    (acc, key) => (acc && acc[key] != null ? acc[key] : undefined),
    obj
  );
}

/**
 * Resolve a raw token value which can be:
 *  - primitive string
 *  - reference to another token ("pwdr.*")
 *  - array of tokens / literals, used e.g. for box-shadow
 */
function resolveRawValue(raw: any, theme: PwdrThemeKey): any {
  if (raw == null) return raw;

  // Array form – e.g. ["pwdr.sys.elevation.shadow-size.24", "pwdr.ref.color.shadow.default"]
  if (Array.isArray(raw)) {
    const parts = raw.map((part) => {
      if (typeof part === "string" && part.startsWith("pwdr.")) {
        return token(part, { theme });
      }
      return part;
    });

    // Join with spaces for CSS-friendly output ("size color")
    return parts.join(" ");
  }

  if (typeof raw === "string" && raw.startsWith("pwdr.")) {
    return token(raw, { theme });
  }

  return raw;
}

/**
 * Reference-token leaf shape (supports multiple themes).
 * Example:
 *   {
 *     value: "pwdr.sys.color.palette.neutral.050",
 *     dark: { value: "pwdr.sys.color.palette.neutral.950" },
 *     "high-contrast": { value: "pwdr.sys.color.palette.neutral.1000" }
 *   }
 *
 * Also supports:
 *   {
 *     value: "...",
 *     themes: { dark: { value: "..." }, "high-contrast": { value: "..." } }
 *   }
 */
function resolveReferenceNode(node: any, theme: PwdrThemeKey): any {
  if (!node) return undefined;

  // Leaf: { value, <themeKey>?, themes? }
  if (
    typeof node === "object" &&
    ("value" in node || "themes" in node || "dark" in node || "high-contrast" in node)
  ) {
    const base = node as any;

    let raw = base.value;

    // Theme override: only apply when theme !== "light"
    if (theme !== "light") {
      // 1) direct key override (e.g. node["high-contrast"])
      const direct = base[theme];

      // 2) themes bag (e.g. node.themes["high-contrast"])
      const bag = base.themes?.[theme];

      // 3) backward-compat for older shape where only `dark` existed
      const legacyDark = theme === "dark" ? base.dark : undefined;

      const override =
        typeof direct !== "undefined" ? direct : typeof bag !== "undefined" ? bag : legacyDark;

      // override may be { value: ... } or a raw primitive/array
      const overrideValue =
        override && typeof override === "object" && "value" in override ? override.value : override;

      if (typeof overrideValue !== "undefined" && overrideValue !== "None") {
        raw = overrideValue;
      }
    }

    return resolveRawValue(raw, theme);
  }

  // Nested object: resolve each child
  if (typeof node === "object") {
    const result: Record<string, any> = {};
    for (const [key, child] of Object.entries(node)) {
      result[key] = resolveReferenceNode(child, theme);
    }
    return result;
  }

  return node;
}

/**
 * Resolve a node coming from systemTokens (pwdr.sys.*).
 * System tokens don't have theme variations.
 */
function resolveSystemNode(node: any, theme: PwdrThemeKey): any {
  if (!node) return undefined;

  if (typeof node === "object" && "value" in node) {
    return resolveRawValue((node as any).value, theme);
  }

  if (typeof node === "object") {
    const result: Record<string, any> = {};
    for (const [key, child] of Object.entries(node)) {
      result[key] = resolveSystemNode(child, theme);
    }
    return result;
  }

  return node;
}

/**
 * Resolve a node coming from mixinTokens (pwdr.mxn.*).
 * Returns a flat map of CSS properties -> resolved values.
 */
function resolveMixinNode(node: any, theme: PwdrThemeKey): Record<string, any> {
  const result: Record<string, any> = {};

  if (!node || typeof node !== "object") return result;

  for (const [prop, leaf] of Object.entries(node)) {
    const maybeValue = (leaf as any)?.value;

    if (typeof maybeValue !== "undefined") {
      result[prop] = resolveRawValue(maybeValue, theme);
      continue;
    }

    if (typeof leaf === "object" && leaf !== null) {
      result[prop] = resolveMixinNode(leaf, theme);
    }
  }

  return result;
}

/**
 * Main token resolver.
 */
export function token(name: string, options: TokenOptions = {}): any {
  const theme = normalizeTheme(options?.theme ?? "light");

  if (!name || typeof name !== "string") return name;

  // Allow passing literal non-token values through
  if (!name.startsWith("pwdr.")) return name;

  const parts = name.split(".");
  const [, kind, ...rest] = parts; // "sys" | "ref" | "mxn"
  const path = rest.join(".");

  switch (kind) {
    case "sys": {
      const node = getDeep(systemTokens as any, path);
      return resolveSystemNode(node, theme);
    }
    case "ref": {
      const node = getDeep(referenceTokens as any, path);
      return resolveReferenceNode(node, theme);
    }
    case "mxn": {
      const node = getDeep(mixinTokens as any, path);
      return resolveMixinNode(node, theme);
    }
    default:
      return name;
  }
}
