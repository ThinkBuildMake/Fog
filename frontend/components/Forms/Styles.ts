import styled from 'styled-components'

export const Table = styled.table`
    display: flex;
    flex-direction: column;
    align-items: center;

    th {
        font-size: 24px;
        text-align: left;
    }
    td {
        width: 100%;
    }
    tr {
        width: 100%;
        margin-bottom: 15px;
    }
    * {
        font-family: Poppins;
    }
    input {
        width: 100%;
        height: 30px;
        padding: 10px;
    }
    textarea {
        width: 100%;
        height: 150px;
        resize: none;
        padding: 10px;
    }
    input::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder {
        color: gray; /*Change the placeholder color*/
        opacity: 0.5; /*Change the opacity between 0 and 1*/
    }
    button {
        padding: 10px;
        font-size: 20px;
        width: 50%;
        cursor: pointer;
    }
`
export const OneColumnRow = styled.tr`
    display: flex;
    flex-direction: column;
`
export const TwoColumnsRow = styled.tr`
    display: flex;
    justify-content: space-between;
`
export const TwoColumnRowElement = styled.div`
    display: flex;
    flex-direction: column;
    width: 45%;
`
