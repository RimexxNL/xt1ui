import React, { FC, ReactElement, ReactNode, useCallback } from "react"
import {FeatureProps, SimpleDirections} from "./resources/typescript/types"
import {ApplyFeatures} from "./resources/typescript/helpers"

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>{
    children: ReactNode
    icon?: ReactElement
    iconPos?: SimpleDirections
    features?: FeatureProps
    danger?: boolean
    disabled?: boolean
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
}

const baseButtonClasses = ["xt1button"]

const Button:FC<ButtonProps> = ({icon, iconPos='left',features,children,danger,disabled,onClick,...rest}) => {

    const classes = [...baseButtonClasses, ...ApplyFeatures(features || {},danger || false,disabled || false)].join(' ')

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
          if (!disabled) onClick?.(e)
        },
        [onClick, disabled],
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault()
            onClick?.(e as unknown as React.MouseEvent<HTMLButtonElement>)
        }
    }

    function getTextFromChildren(children: ReactNode): string {
        if (typeof children === 'string') return children
        if (Array.isArray(children)) {
            return children.map(getTextFromChildren).join('')
        }
        if (React.isValidElement(children)) {
            // @ts-ignore
            return getTextFromChildren(children.props.children)
        }
        return ''
    }

    const label = getTextFromChildren(children)

    return (
        <button
            className={classes}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            aria-label={label}
            aria-disabled={disabled}
            {...rest}
        >
            {icon && iconPos === 'left' && <>{icon}</> }
            {children}
            {icon && iconPos === 'right' && <>{icon}</> }
        </button>
    )
}

export default Button