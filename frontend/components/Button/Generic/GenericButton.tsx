import React from 'react'
import { Button } from './Styles'
import { Sizes } from '@functions/customfuncs'

interface Props {
    text: string
    color?: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    size?: Sizes
}

const GenericButton: React.FC<Props> = ({
    text,
    color,
    size,
    onClick,
    disabled
}) => {
    return (
        <Button
            onClick={onClick}
            sizeParam={size}
            color={color}
            disabled={disabled}
        >
            {text}
        </Button>
    )
}
export default GenericButton
