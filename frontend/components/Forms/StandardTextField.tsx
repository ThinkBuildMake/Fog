import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginBottom: theme.spacing(1),
                width: '25ch'
            }
        }
    })
)
interface Props {
    onChange: React.ChangeEventHandler<HTMLInputElement>
    label: string
    errorMsg: string
    error: boolean
}
export default function StandardTextField({
    onChange,
    label,
    errorMsg,
    error
}: Props) {
    const classes = useStyles()

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                onChange={onChange}
                id="standard-basic"
                label={label}
                helperText={!error ? '' : errorMsg}
                error={error}
            />
        </form>
    )
}
