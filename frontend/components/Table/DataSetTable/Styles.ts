import styled from 'styled-components'
export const Table = styled.table`
    border: 1px solid black;
    width: 100%;
    border-collapse: collapse;
    th {
        font-size: 36px;
        padding-top: 16px;
    }
    td {
        font-size: 24px;
    }
    tr {
        border-bottom: 1px solid black;
        height: 70px;
    }
    * {
        font-family: Poppins;
    }
    .left {
        width: 80%;
        text-align: left;
        padding-left: 20px;
    }
    .right {
        width: 20%;
        text-align: right;
        padding-right: 20px;
    }
`
export const DownloadButton = styled.a`
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;

    text-decoration: none;
    background-color: #c4c4c4;
    color: black;
    border: 1px solid black;
    padding: 5px 16px 5px 16px;
    border-radius: 4px;
`
