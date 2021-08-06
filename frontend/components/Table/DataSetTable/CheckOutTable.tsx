import React from 'react'
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
import ConfirmButton from '@components/Button/Generic/Button'

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
})

function createRow(
    res: string,
    price: string,
    cap: number,
    avail: number,
    quant
) {
    return { res, price, cap, avail, quant }
}

interface Row {
    res: string
    price: string
    cap: number
    avail: number
}

const rows = [
    createRow('HW Set 1', '$0.15/quantity/hr', 36, 16, <StandardTextField />),
    createRow('HW Set 2', '$0.20/quantity/hr', 22, 5, <StandardTextField />),
    createRow('HW Set 3', '$0.22/quantity/hr', 27, 22, <StandardTextField />)
]

export default function CheckOutTable() {
    const classes = useStyles()

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>Resource</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell align="right">Capacity</TableCell>
                        <TableCell align="right">Available</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.res}>
                            <TableCell>{row.res}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell align="right">{row.cap}</TableCell>
                            <TableCell align="right">{row.avail}</TableCell>
                            <TableCell align="right">{row.quant}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableRow>
                    <TableCell rowSpan={5} align="center">
                        <ConfirmButton text="Confirm" />
                    </TableCell>
                </TableRow>
            </Table>
        </TableContainer>
    )
}
