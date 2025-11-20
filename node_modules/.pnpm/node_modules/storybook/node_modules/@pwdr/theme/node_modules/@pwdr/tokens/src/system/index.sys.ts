import { shape } from "./shape.sys"
import { color } from "./color.sys"
import { typography } from "./typography.sys"
import { elevation } from "./elevations.sys"

export const systemTokens = {

    'shape' : shape,
    'color' : color,
    'typography': typography,
    'elevation' : elevation

} as const;

export type SystemTokens = typeof systemTokens;