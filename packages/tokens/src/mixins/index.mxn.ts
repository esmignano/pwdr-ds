import { typography } from "./typography.mxn";

export const mixinTokens = {
    'typography' : typography,
} as const;

export type MixinTokens = typeof mixinTokens;