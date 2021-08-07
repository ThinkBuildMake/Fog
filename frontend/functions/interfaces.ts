export interface CheckoutTableRow {
    res: string
    price: string
    cap: number
    avail: number
}
export interface CheckinTableRow {
    res: string
    avail: number
}
export interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}
export interface LinkTabProps {
    label?: string
    href?: string
}
export interface Resource {
    _id: { $oid: string }
    available_resources: number
    capacity: number
    price: number
    title: string
}
