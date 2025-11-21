// packages/tokens/src/utils/token.ts

import { systemTokens } from "../system/index.sys";
import { referenceTokens } from "../reference/index.ref";
import { mixinTokens } from "../mixins/index.mxn";

export type PwdrThemeKey = "light" | "dark";

type TokenOptions = {
  theme?: PwdrThemeKey;
};

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
 * Resolve a node coming from referenceTokens (pwdr.ref.*).
 * Handles theme (light/dark) and recursive references.
 */
function resolveReferenceNode(node: any, theme: PwdrThemeKey): any {
  if (!node) return undefined;

  // Leaf: { value, dark? }
  if ("value" in node || "dark" in node) {
    const base = node as { value?: any; dark?: { value?: any } };

    let raw = base.value;

    if (
      theme === "dark" &&
      base.dark &&
      typeof base.dark.value !== "undefined" &&
      base.dark.value !== "None"
    ) {
      raw = base.dark.value;
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
 * System tokens don't have theme variations, so we just unwrap value / recurse.
 */
function resolveSystemNode(node: any, theme: PwdrThemeKey): any {
  if (!node) return undefined;

  if ("value" in node) {
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

  if (!node || typeof node !== "object") {
    return result;
  }

  for (const [prop, leaf] of Object.entries(node)) {
    const maybeValue = (leaf as any)?.value;

    if (typeof maybeValue !== "undefined") {
      // leaf: { value: ... }
      result[prop] = resolveRawValue(maybeValue, theme);
      continue;
    }

    // Nested structure, recurse (useful if you ever nest mixins)
    if (typeof leaf === "object" && leaf !== null) {
      result[prop] = resolveMixinNode(leaf, theme);
    }
  }

  return result;
}

/**
 * Main token resolver.
 *
 * Examples:
 *  token("pwdr.sys.color.palette.neutral.050")
 *    -> "#F4F4FF"
 *
 *  token("pwdr.ref.color.border.default")
 *    -> "#F4F4FF" (after resolving ref -> sys)
 *
 *  token("pwdr.ref.elevation.surface.active")
 *    -> "0px 0px 4px 0px #6666FF"
 *
 *  token("pwdr.mxn.typography.title.xl")
 *    -> { "font-family": "...", "font-weight": "...", "font-size": "..." }
 */
export function token(
  name: string,
  options: TokenOptions = {}
): any {
  const theme: PwdrThemeKey = options.theme ?? "light";

  if (!name || typeof name !== "string") return name;

  // Allow passing literal non-token values through
  if (!name.startsWith("pwdr.")) {
    return name;
  }

  const parts = name.split(".");
  const [, kind, ...rest] = parts; // kind = "sys" | "ref" | "mxn"
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
      // Unknown kind, return as-is
      return name;
  }
}
