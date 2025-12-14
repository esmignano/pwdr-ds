export const typography = {

    "font-family": {
        value: "'Figtree', Arial, sans-serif"
    },

    "font-weight": {
        regular:  { value: "400" },
        medium:   { value: "500" },
        semibold: { value: "600" },
        bold:     { value: "700" }
    },

    "line-height": {
        "050" : { value: "1.5rem" },
        "100" : { value: "1.25rem" },
        '150' : { value: "1rem" }
    },

    "font-size": {
        "8":  { value: "4rem" },
        "10": { value: "3rem" },
        "12": { value: "2rem" },
        "14": { value: "1.5rem" },
        "16": { value: "1.25rem" },
        "20": { value: "1rem" },
        "24": { value: ".875rem" },
        "32": { value: ".75rem" },
        "48": { value: ".625rem" },
        "64": { value: ".5rem" }
    },

    case: {
        upper: { value: "uppercase" },
        camelcase: { value: 'capitalize' },
        default: { value: 'none' },
        lower: { value: "lowercase" }
    }
} as const;

export type TypographySystem = typeof typography;