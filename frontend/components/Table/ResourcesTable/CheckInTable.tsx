import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { ProjectContext } from 'contexts/Project'
import StandardTextField from '@components/Forms/StandardTextField'
import ConfirmButton from '@components/Button/Confirm/Button'
import Box from '@material-ui/core/Box'
import { TableFooter } from '@material-ui/core'
import { createCheckinTableRow } from '@functions/customfuncs'
import { Resource } from '@functions/interfaces'

interface CheckinTableProps {
    resources: Resource[]
}
const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
})

export default function CheckInTable({ resources }: CheckinTableProps) {
    const classes = useStyles()
    const [quantities, setQuantities] = useState<(string | number)[]>([])

    // Load in the Quantities
    useEffect(() => {
        setQuantities(
            resources.map(() => {
                return ''
            })
        )
    }, [resources])

    function handleChange(
        event: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) {
        let tempQuantity = [...quantities]
        tempQuantity[index] = isNaN(parseInt(event.target.value))
            ? event.target.value
            : parseInt(event.target.value)
        setQuantities(tempQuantity)
    }
    function onSubmitForm() {}
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
                    {resources.map((row, index) => (
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
                                                quantities[index] >= 0 &&
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
                                    onClick={onSubmitForm}
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
