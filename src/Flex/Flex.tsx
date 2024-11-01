import React, { CSSProperties, FC, HTMLAttributes, ReactNode } from "react"
import styled from '@emotion/styled'

// Define the styled Flex component
const StyledFlex = styled.div<FlexProps>`
    display: flex;
    flex-direction: ${(props) => props.vertical ? 'column' : 'row'};
    justify-content: ${(props) => props.justify || 'flex-start'};
    align-items: ${(props) => props.align || 'stretch'};
    flex-wrap: ${(props) => props.wrap || 'nowrap'};
    gap: ${(props) => props.gap || 0}px;
`

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    justify?: CSSProperties['justifyContent'];
    align?: CSSProperties['alignItems'];
    wrap?: CSSProperties['flexWrap'];
    gap?: number;
    vertical?: boolean;
    className?: string;
}

const Flex: FC<FlexProps> = ({ children, justify, align, wrap, gap, className, ...props }) => {
    return (
        <StyledFlex
            justify={justify}
            align={align}
            wrap={wrap}
            gap={gap}
            className={className}  // Allow additional classes for styling if needed
            {...props}
        >
            {children}
        </StyledFlex>
    )
}

export default Flex