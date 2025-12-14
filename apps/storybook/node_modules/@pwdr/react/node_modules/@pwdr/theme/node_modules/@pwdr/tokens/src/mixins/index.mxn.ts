import { typography } from "./typography.mxn";
import { elevation } from "./elevation.mxn";

export const mixinTokens = {
    'typography' : typography,
    'elevation' : elevation,
} as const;

export type MixinTokens = typeof mixinTokens;