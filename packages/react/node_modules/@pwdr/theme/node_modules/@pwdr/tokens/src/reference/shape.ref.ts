export const shape = {
  radius: {
    '100': {
      value: "pwdr.sys.shape.size.4",
      isReference: true
    },
    '150': {
      value: "pwdr.sys.shape.size.6",
      isReference: true
    },
    '200': {
      value: "pwdr.sys.shape.size.8",
      isReference: true
    },
    '300': {
      value: "pwdr.sys.shape.size.12",
      isReference: true
    },
    '400': {
      value: "pwdr.sys.shape.size.20",
      isReference: true
    },
    max: {
      value: "pwdr.sys.shape.size.9999",
      isReference: true
    }
  },

  width: {
    "050": {
      value: "pwdr.sys.shape.size.1",
      isReference: true
    },
    "100": {
      value: "pwdr.sys.shape.size.2",
      isReference: true
    }
  },

  space: {
    "000": { value: "pwdr.sys.shape.size.0", isReference: true },
    "025": { value: "pwdr.sys.shape.size.1", isReference: true},
    "050": { value: "pwdr.sys.shape.size.2", isReference: true},
    "075": { value: "pwdr.sys.shape.size.3", isReference: true},
    "100": { value: "pwdr.sys.shape.size.4", isReference: true},
    "150": { value: "pwdr.sys.shape.size.6", isReference: true},
    "200": { value: "pwdr.sys.shape.size.8", isReference: true},
    "300": { value: "pwdr.sys.shape.size.12", isReference: true},
    "400": { value: "pwdr.sys.shape.size.16", isReference: true},
    "500": { value: "pwdr.sys.shape.size.20", isReference: true},
    "600": { value: "pwdr.sys.shape.size.24", isReference: true},
    "700": { value: "pwdr.sys.shape.size.28", isReference: true},
    "1000": { value: "pwdr.sys.shape.size.40", isReference: true },
    "1500": { value: "pwdr.sys.shape.size.60", isReference: true },
    "2000": { value: "pwdr.sys.shape.size.80", isReference: true },
    max:   { value: "pwdr.sys.shape.size.9999", isReference: true }
  }
} as const;

export type ShapeReference = typeof shape;
