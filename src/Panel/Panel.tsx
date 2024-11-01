import React, { FC, HTMLAttributes, ReactNode } from "react"
import styled from '@emotion/styled'

// Define the styled Flex component
const StyledPanel = styled.div<PanelProps>`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: var(--xt1-container);
    color: var(--xt1-color-text);
`

interface PanelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}

const Panel: FC<PanelProps> = ({ children, className, ...props }) => {
    return (
        <StyledPanel
            className={className}  // Allow additional classes for styling if needed
            {...props}
        >
            {children}
        </StyledPanel>
    )
}

export default Panel