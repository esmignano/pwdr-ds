export const typography = {
    title: {
      xxxl: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.64" }
      },
      xxl: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.48" }
      },
      xl: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.32" }
      },
      lg: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.24" }
      },
      md: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.20" }
      },
      default: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.16" }
      },
      sm: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.14" }
      },
      xs: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.12" }
      },
      xxs: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.10" }
      },
      xxxs: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.semibold" },
        "font-size":   { value: "pwdr.sys.typography.font-size.8" }
      }
    },

    subtitle: {
      xxxl: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.48" }
      },
      xxl: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.32" }
      },
      xl: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.24" }
      },
      lg: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.20" }
      },
      md: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.16" }
      },
      default: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.14" }
      },
      sm: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.12" }
      },
      xs: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.10" }
      },
      xxs: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.medium" },
        "font-size":   { value: "pwdr.sys.typography.font-size.8" }
      }
    },

    body: {
      lg: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.regular" },
        "font-size":   { value: "pwdr.sys.typography.font-size.14" }
      },
      md: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.regular" },
        "font-size":   { value: "pwdr.sys.typography.font-size.12" }
      },
      sm: {
        "font-family": { value: "pwdr.sys.typography.font-family" },
        "font-weight": { value: "pwdr.sys.typography.font-weight.regular" },
        "font-size":   { value: "pwdr.sys.typography.font-size.10" }
      }
    }
} as const;

export type TypographyMixins = typeof typography;
