import { shape } from "./shape.ref";
import { color } from "./color.ref"
import { typography } from "../system/typography.sys";

export const referenceTokens = {
    'shape' : shape,
    'color' : color,
    'typography' : typography
} as const;

export type ReferenceTokens = typeof referenceTokens;