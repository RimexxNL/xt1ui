import React, {CSSProperties, FC, HTMLAttributes, LegacyRef, ReactNode} from "react"

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    justify?: CSSProperties['justifyContent']
    align?: CSSProperties['alignItems']
    wrap?: CSSProperties['flexWrap']
    gap?: number
    vertical?: boolean
    className?: string
    style?: CSSProperties
}

const baseFlexClasses = ["xt1flex"]

const Flex = ({ children, justify, align, wrap, gap,vertical,className,style, ...rest }:FlexProps) => {

    const classes = [...baseFlexClasses, className].filter(Boolean)
    const styles:CSSProperties = style || {}

    if (justify) classes.push(`justify-${justify}`)
    if (align) classes.push(`align-${align}`)
    if (wrap) classes.push(`flex-${wrap}`)
    if (gap) styles.gap = `${gap}px`

    if (vertical) { classes.push(`flex-col`) } else { classes.push(`flex-row`) }

    const resultClasses = classes.join(' ')

    return (
        <div
            className={resultClasses}
            style={styles}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Flex