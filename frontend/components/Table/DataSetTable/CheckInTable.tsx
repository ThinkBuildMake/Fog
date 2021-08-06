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
import Box from '@material-ui/core/Box'

const useStyles = makeStyles({
    table: {
        minWidth: 700
    }
})

function createRow(res: string, avail: number, quant) {
    return { res, avail, quant }
}

interface Row {
    res: string
    avail: number
}

const rows = [
    createRow('HW Set 1', 18, <StandardTextField />),
    createRow('HW Set 2', 15, <StandardTextField />),
    createRow('HW Set 3', 4, <StandardTextField />)
]

export default function CheckInTable() {
    const classes = useStyles()

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
                    {rows.map((row) => (
                        <TableRow key={row.res}>
                            <TableCell>{row.res}</TableCell>
                            <TableCell align="right">{row.avail}</TableCell>
                            <TableCell align="right">{row.quant}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableRow>
                    <TableCell align="center">
                        <Box display="flex" justifyContent="center">
                            <ConfirmButton text="Confirm" />
                        </Box>
                    </TableCell>
                </TableRow>
            </Table>
        </TableContainer>
    )
}
