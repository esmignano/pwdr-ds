export const elevation = {
    surface : {
        default : {
            '100' : { value: [  "pwdr.sys.elevation.shadow-size.24",  'pwdr.ref.color.shadow.default' ] },
            '200' : { value: [  "pwdr.sys.elevation.shadow-size.16",  'pwdr.ref.color.shadow.default' ] },
            '300' : { value: [  "pwdr.sys.elevation.shadow-size.8",   'pwdr.ref.color.shadow.default' ] },
            '400' : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.default' ] },
        },
        active : { value: ["pwdr.sys.elevation.shadow-size.4",  'pwdr.ref.color.shadow.active' ] },
        alert : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.alert' ] },
        warning : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.warning' ] }, 
        success : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.success' ] }, 
        disabled : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.disabled' ] }, 
        discovery : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.discovery' ] },
        bold : { value: [  "pwdr.sys.elevation.shadow-size.4",   'pwdr.ref.color.shadow.bold' ] },
    }

} as const;

export type ElevationReference = typeof elevation;