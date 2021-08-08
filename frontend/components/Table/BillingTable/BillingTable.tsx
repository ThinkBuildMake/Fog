import React, { useEffect, useState } from 'react'
import { Table } from './Styles'

interface BillingItem {
    title: string
    price: number
    quantity: number
    hours: number
    cost: number
}

interface BillingProps {
    data: BillingItem[]
}

const BillingTable: React.FC<BillingProps> = ({ data }) => {
    const [totalBill, setTotalBill] = useState<number>(0)
    useEffect(() => {
        // Sum up total bill
        setTotalBill(data.reduce((a, b) => a + b.cost, 0))
    }, [])
    const BillingTableHeader: React.FC = () => {
        return (
            <tr>
                <th></th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Hours</th>
                <th>Cost</th>
            </tr>
        )
    }
    const BillingTableRow: React.FC<BillingItem> = ({
        title,
        price,
        quantity,
        hours,
        cost
    }) => {
        return (
            <tr>
                <td>{title}</td>
                <td>${price}/quantity/hr</td>
                <td>{quantity}</td>
                <td>{hours}</td>
                <td>${cost.toFixed(2)}</td>
            </tr>
        )
    }
    const BillingTableFooter: React.FC = () => {
        return (
            <tfoot>
                <th> </th>
                <th></th>
                <th></th>
                <th> Total</th>
                <th>${totalBill.toFixed(2)}</th>
            </tfoot>
        )
    }
    return (
        <Table>
            <thead>
                <BillingTableHeader />
            </thead>
            <tbody>
                {data.map((item, key) => {
                    return (
                        <BillingTableRow
                            key={key}
                            title={item.title}
                            price={item.price}
                            quantity={item.quantity}
                            hours={item.hours}
                            cost={item.cost}
                        />
                    )
                })}
                <BillingTableFooter />
            </tbody>
        </Table>
    )
}

export default BillingTable
