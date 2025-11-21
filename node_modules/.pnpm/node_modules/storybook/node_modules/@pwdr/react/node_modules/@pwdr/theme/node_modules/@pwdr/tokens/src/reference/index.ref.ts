import { shape } from "./shape.ref";
import { color } from "./color.ref"
import { elevation } from "./elevation.ref";

export const referenceTokens = {
    'shape' : shape,
    'color' : color
} as const;

export type ReferenceTokens = typeof referenceTokens;