export const typography = {

    "font-family": {
        value: "Figtree', Arial, sans-serif"
    },

    "font-weight": {
        regular:  { value: "400" },
        medium:   { value: "500" },
        semibold: { value: "600" },
        bold:     { value: "700" }
    },

    "line-hieght": {
        sm: { value: "1.5 rem" },
        md: { value: "1.25 rem" },
        lg: { value: "1 rem / 16 px" }
    },

    "font-size": {
        "8":  { value: "64px" },
        "10": { value: "48px" },
        "12": { value: "32px" },
        "14": { value: "24px" },
        "16": { value: "20px" },
        "20": { value: "16px" },
        "24": { value: "14px" },
        "32": { value: "12px" },
        "48": { value: "10px" },
        "64": { value: "8px" }
    },

    case: {
        upper: { value: "uppercase" },
        lower: { value: "none" }
    }
} as const;

export type TypographySystem = typeof typography;