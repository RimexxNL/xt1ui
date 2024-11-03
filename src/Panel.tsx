import React, { FC, HTMLAttributes, ReactNode } from "react"
import {ApplyFeatures} from "./resources/typescript/helpers";
import {FeatureProps} from "./resources/typescript/types";

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode
    features?: FeatureProps
    className?: string
}

const basePanelClasses = ["xt1panel"]

const Panel: FC<PanelProps> = ({ children, className, features, ...rest }) => {

    const classes = [...basePanelClasses, className, ...ApplyFeatures(features || {},false,false)].join(' ')

    return (
        <div
            className={classes}
            {...rest}
        >
            {children}
        </div>
    )
}

export default Panel