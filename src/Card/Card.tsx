import React, {FC, ReactElement} from "react"
import {FeatureProps} from "../types"
import {ApplyFeatures} from "../helpers"

export interface CardProps {
    children?: ReactElement
    header?: string | ReactElement
    cover?: ReactElement
    features?: FeatureProps
    footer?: string | ReactElement
}

const baseCardClasses = ["xt1card"]

const Card:FC<CardProps> = ({children,header,cover,features,footer})=>{

    const classes = [...baseCardClasses, ...ApplyFeatures(features || {},false,false)].join(' ')

    return (
        <div className={classes}>
            { header && !cover && (
                <div className={`xt1card-header`}>
                    {header}
                </div>
            )}
            { cover && (
                <div className={`xt1card-cover`}>
                    {cover}
                </div>
            )}
            <div className={`xt1card-content`}>
                {children}
            </div>
            { footer && (
                <div className={`xt1card-footer`}>
                    {footer}
                </div>
            )}
        </div>
    )
}

export default Card