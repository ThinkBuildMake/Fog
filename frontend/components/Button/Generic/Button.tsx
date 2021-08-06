import React from 'react'
import Button from '@material-ui/core/Button'

interface Props {
    text: string
    onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const ConfirmButton: React.FC<Props> = ({ text }) => {
    return (
        <Button variant="contained" size="large" color="secondary">
            {text}
        </Button>
    )
}
export default ConfirmButton
