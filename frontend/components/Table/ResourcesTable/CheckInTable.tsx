import React, { useState, useEffect, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import StandardTextField from '@components/Forms/StandardTextField'
import ConfirmButton from '@components/Button/Confirm/Button'
import Box from '@material-ui/core/Box'
import { TableFooter } from '@material-ui/core'
import { Resource } from '@functions/interfaces'
import { postRequest, envs } from '@functions/customfuncs'
import { ActionKind } from '@reducers/ResourcesReducer'
import { ResourceContext } from 'contexts/Resources'

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
})

export default function CheckInTable() {
    // Load the Resources from the Context Instead of Props
    const { state, dispatch } = useContext(ResourceContext)
    const classes = useStyles()
    const [quantities, setQuantities] = useState<(string | number)[]>([])

    // Load in the Quantities
    useEffect(() => {
        setQuantities(
            state.map(() => {
                return ''
            })
        )
    }, [state])

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        let tempQuantity = [...quantities]
        tempQuantity[index] = isNaN(Number(event.target.value))
            ? event.target.value
            : parseInt(event.target.value)
        setQuantities(tempQuantity)
    }
    function onSubmitQuery() {
        state.map((resource, index) => {
            const currentQuantity: any =
                Number(quantities[index]) !== NaN ? quantities[index] : 0
            // Check if quantities checked in is valid
            if (
                currentQuantity >= 1 &&
                currentQuantity <=
                    resource.capacity - resource.available_resources
            ) {
                // Call method to check in resources
                dispatch({
                    index: index,
                    payload: currentQuantity,
                    type: ActionKind.Checkin
                })
                postRequest(
                    `${envs[process.env.appEnv]}/hardware/${
                        resource._id.$oid
                    }/checkin`,
                    { amount: currentQuantity }
                )
            }
        })
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Resource</TableCell>
                        <TableCell align="right">Available</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {state.map((row, index) => (
                        <TableRow key={row._id.$oid}>
                            <TableCell>{row.title}</TableCell>
                            <TableCell align="right">
                                {row.capacity - row.available_resources}
                            </TableCell>
                            <TableCell align="right">
                                {
                                    <StandardTextField
                                        onChange={(e) => handleChange(e, index)}
                                        error={
                                            quantities[index] === '' ||
                                            (typeof quantities[index] ===
                                                'number' &&
                                                quantities[index] >= 1 &&
                                                quantities[index] <=
                                                    row.capacity -
                                                        row.available_resources)
                                                ? false
                                                : true
                                        }
                                    />
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell align="center">
                            <Box display="flex" justifyContent="center">
                                <ConfirmButton
                                    onClick={onSubmitQuery}
                                    text="Confirm"
                                />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    )
}
