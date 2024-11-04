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

export type AccentColors = 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'magenta' | 'pink' | 'gray' | string
export type SystemTheme = 'light' | 'dark' | 'system'
export type LightDarkTheme = 'light' | 'dark'

export type GenericClickEvent = (e: React.MouseEvent<HTMLElement>) => void;