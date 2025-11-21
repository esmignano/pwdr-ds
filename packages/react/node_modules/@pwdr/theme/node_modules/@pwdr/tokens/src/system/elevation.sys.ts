export const elevation = {
    "shadow-size" : {
        '24' : { value: '0px 0px 24px 0px'},
        '16' : { value: '0px 0px 16px 0px'},
        '8' : { value: '0px 0px 8px 0px'},
        '4' : { value: '0px 0px 4px 0px'},
    },
    z : {
        pos : {
            '100': { value: '100' },
            '200': { value: '200' },
            '300': { value: '300' },
            '400': { value: '400' },
            '500': { value: '500' },
        },
        flat : { value : '0' },
        neg : {
            '100': { value: '-100' },
            '200': { value: '-200' },
            '300': { value: '-300' },
            '400': { value: '-400' },
            '500': { value: '-500' },
        }
    },
    border : {
        style: { value: "solid" }
    }
} as const;

export type ElevationSystem = typeof elevation;