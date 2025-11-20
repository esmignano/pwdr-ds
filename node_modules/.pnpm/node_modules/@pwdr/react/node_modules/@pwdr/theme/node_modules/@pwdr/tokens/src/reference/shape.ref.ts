export const shape = {
  radius: {
    xs: {
      value: "pwdr.sys.shape.size.100",
      isReference: true
    },
    sm: {
      value: "pwdr.sys.shape.size.150",
      isReference: true
    },
    md: {
      value: "pwdr.sys.shape.size.200",
      isReference: true
    },
    lg: {
      value: "pwdr.sys.shape.size.300",
      isReference: true
    },
    xl: {
      value: "pwdr.sys.shape.size.500",
      isReference: true
    },
    full: {
      value: "pwdr.sys.shape.size.max",
      isReference: true
    }
  },

  width: {
    sm: {
      value: "pwdr.sys.shape.size.025",
      isReference: true
    },
    md: {
      value: "pwdr.sys.shape.size.050",
      isReference: true
    }
  },

  space: {
    "000": { value: "pwdr.sys.shape.size.000", isReference: true },
    "025": { value: "pwdr.sys.shape.size.025", isReference: true},
    "050": { value: "pwdr.sys.shape.size.050", isReference: true},
    "075": { value: "pwdr.sys.shape.size.075", isReference: true},
    "100": { value: "pwdr.sys.shape.size.100", isReference: true},
    "150": { value: "pwdr.sys.shape.size.150", isReference: true},
    "200": { value: "pwdr.sys.shape.size.200", isReference: true},
    "300": { value: "pwdr.sys.shape.size.300", isReference: true},
    "400": { value: "pwdr.sys.shape.size.400", isReference: true},
    "500": { value: "pwdr.sys.shape.size.500", isReference: true},
    "600": { value: "pwdr.sys.shape.size.600", isReference: true},
    "700": { value: "pwdr.sys.shape.size.700", isReference: true},
    "1000": { value: "pwdr.sys.shape.size.1000", isReference: true },
    "1500": { value: "pwdr.sys.shape.size.1500", isReference: true },
    "2000": { value: "pwdr.sys.shape.size.2000", isReference: true },
    max:   { value: "pwdr.sys.shape.size.max", isReference: true }
  }
} as const;

export type ShapeReference = typeof shape;
