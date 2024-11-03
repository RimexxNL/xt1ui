import React from "react";

export interface FeatureProps {
    rounded?: boolean
    outlined?: boolean
    effect?: boolean
    raised?: boolean
    dashed?: boolean
    dotted?: boolean
}

export type SimpleDirections = 'left' | 'right'
export type BasicDirections = 'left' | 'right' | 'center'
export type Directions = 'left' | 'right' | 'center' | 'top' | 'bottom'

export type GenericClickEvent = (e: React.MouseEvent<HTMLElement>) => void;