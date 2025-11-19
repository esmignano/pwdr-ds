export const shape = {
  radius: {
    xs: {
      value: "pwdr.sys.shape.size.100"
    },
    sm: {
      value: "pwdr.sys.shape.size.150"
    },
    md: {
      value: "pwdr.sys.shape.size.200"
    },
    lg: {
      value: "pwdr.sys.shape.size.300"
    },
    xl: {
      value: "pwdr.sys.shape.size.500"
    },
    full: {
      value: "pwdr.sys.shape.size.max"
    }
  },

  width: {
    sm: {
      value: "pwdr.sys.shape.size.025"
    },
    md: {
      value: "pwdr.sys.shape.size.050"
    }
  },

  space: {
    "000": { value: "pwdr.sys.shape.size.000" },
    "025": { value: "pwdr.sys.shape.size.025" },
    "050": { value: "pwdr.sys.shape.size.050" },
    "075": { value: "pwdr.sys.shape.size.075" },
    "100": { value: "pwdr.sys.shape.size.100" },
    "150": { value: "pwdr.sys.shape.size.150" },
    "200": { value: "pwdr.sys.shape.size.200" },
    "300": { value: "pwdr.sys.shape.size.300" },
    "400": { value: "pwdr.sys.shape.size.400" },
    "500": { value: "pwdr.sys.shape.size.500" },
    "600": { value: "pwdr.sys.shape.size.600" },
    "700": { value: "pwdr.sys.shape.size.700" },
    "1000": { value: "pwdr.sys.shape.size.1000" },
    "1500": { value: "pwdr.sys.shape.size.1500" },
    "2000": { value: "pwdr.sys.shape.size.2000" },
    max:   { value: "pwdr.sys.shape.size.max" }
  }
} as const;

export type ShapeReference = typeof shape;
