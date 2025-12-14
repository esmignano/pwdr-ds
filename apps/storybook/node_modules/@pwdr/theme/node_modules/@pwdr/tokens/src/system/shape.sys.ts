export const shape = {
    size : {
        "0":   { value: "0px" },
        "1":   { value: "1px" },
        "2":   { value: "2px" },
        "3":   { value: "3px" },
        "4":   { value: "4px" },
        "6":   { value: "6px" },
        "8":   { value: "8px" },
        "12":   { value: "12px" },
        "16":   { value: "16px" },
        "20":   { value: "20px" },
        "24":   { value: "24px" },
        "28":   { value: "28px" },
        "40":  { value: "40px" },
        "60":  { value: "60px" },
        "80":  { value: "80px" },
        "9999":   { value: "9999px" }
    }
} as const;

export type ShapeSystem = typeof shape;