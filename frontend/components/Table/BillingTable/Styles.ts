import styled from 'styled-components'
//TODO: PASS HEIGHT AS PROP
export const Table = styled.table`
    border: 1px solid black;
    width: 100%;
    border-collapse: collapse;
    overflow-y: auto;
    max-height: calc(100vh - 6rem - 650px);
    display: block;
    thead,
    tbody,
    tr {
        display: block;
        width: 100%;
    }
    th {
        font-size: 24px;
        width: 20%;
        padding-top: 16px;
        position: sticky;
        top: 0;
        z-index: 1;
    }
    thead {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: white;
    }
    td {
        font-size: 20px;
        width: 20%;
        text-align: center;
    }
    tr {
        border-bottom: 1px solid black;
        min-height: 60px;
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    tfoot {
        min-height: 60px;
        display: flex;
        align-items: center;
        padding-top: 5px;
        padding-bottom: 5px;
        position: sticky;
        bottom: 0;
        z-index: 1;
        background-color: white;
        tr {
            border-bottom: none;
        }
    }
    tbody tr:last-child {
        border-bottom: none;
    }
    * {
        font-family: Poppins;
    }
    .left {
        width: 65vw;
        text-align: left;
        padding-left: 20px;
    }
    .right {
        width: 30vw;
        text-align: right;
        padding-right: 20px;
    }
`
