export const elevation = {
    focus : {
        active : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.active" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.active" }
        },
        neutral : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.neutral" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.neutral" }
        },
        bold : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.bold" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.bold" }
        },
        alert : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.alert" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.alert" }
        },
        warning : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.warning" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.warning" }
        },
        success : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.success" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.success" }
        },
        disabled : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.disabled" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.disabled" }
        },
        discovery : {
            'border-width' : { value : "pwdr.ref.shape.width.050" },
            'border-color' : { value : "pwdr.ref.color.border.discovery" },
            'border-style' : { value : "pwdr.sys.elevation.border.style" },
            'box-shadow' : { value : "pwdr.ref.elevation.surface.discovery" }
        },
        
    }

} as const;

export type ElevationMixins = typeof elevation;