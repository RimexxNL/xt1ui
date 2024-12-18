import {FeatureProps} from "./types"

export const ApplyFeatures = (features:FeatureProps, danger:boolean, disabled:boolean):string[] => {

    const classes = []

    const { rounded, outlined, effect, raised, dashed, dotted } = features

    if (rounded) classes.push("rounded")
    if (outlined) classes.push("outlined")
    if (!disabled && effect) classes.push("effect")
    if (raised) classes.push("raised")

    if (dashed && !dotted) classes.push("dashed")
    if (dotted && !dashed) classes.push("dotted")

    if (danger && !disabled) classes.push("danger")
    if (disabled) classes.push("disabled")

    return classes
}