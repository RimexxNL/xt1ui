import React, {FC, useEffect, useState} from "react"
import {BasicDirections, FeatureProps} from "./resources/typescript/types";
import {ApplyFeatures} from "./resources/typescript/helpers";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement>{
    label?: string
    labelPos?: BasicDirections
    features?: FeatureProps
}

const baseDividerClasses = ["xt1divider"]

const Divider:FC<DividerProps> = ({label,labelPos,features}) => {

    let labelPosition = `xt1divider-label-pos-left`
    if (label && labelPos) {
        labelPosition = `xt1divider-label-pos-${labelPos}`
    }

    const classes = [...baseDividerClasses, ...ApplyFeatures(features || {},false,false)].join(' ')

    const [rand, setRand] = useState<string>("")

    const GenerateUniqueString = (): string => {

        const timestamp = Date.now().toString(36)
        const randomComponent = Math.random().toString(36).substring(2, 5)

        return `${timestamp}_${randomComponent}`

    }

    useEffect(() => {
        setRand(GenerateUniqueString())
    }, [])

    useEffect(() => {
        if (rand) {
            const labelElement = document.getElementById(`xt1-divider-label-${rand}`)
            if (labelElement) {
                const bgColor = getBackgroundColor(labelElement)
                if (bgColor) {
                    labelElement.style.backgroundColor = bgColor
                }
            }
        }
    }, [rand])


    const getBackgroundColor = (element: HTMLElement): string | null => {
        let currentElement: HTMLElement | null = element

        while (currentElement) {
            const computedStyle = window.getComputedStyle(currentElement)
            const bgColor = computedStyle.backgroundColor

            // Check if the background color is not transparent
            if (bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
                return bgColor
            }

            currentElement = currentElement.parentElement
        }

        return null
    }

    return (
        <div className={classes}>
            { label && (
                <div id={`xt1-divider-label-${rand || `ai4h3`}`} className={`xt1divider-label ${labelPosition}`}>
                    {label}
                </div>
            )}
        </div>
    )
}

export default Divider