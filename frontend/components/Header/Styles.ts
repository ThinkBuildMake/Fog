import { url } from 'inspector'
import styled from 'styled-components'
import Link from 'next/link'
// TODO: Global Styles => https://blog.logrocket.com/using-styled-components-in-typescript-a-tutorial-with-examples/
export const NavContainer = styled.nav`
    @media (min-width: 600px) {
        padding: 20px;
    }
    a {
        color: white;
        text-align: center;
        padding: 16px;
        text-decoration: none;
        font-size: 24px;
    }
    display: flex;
    justify-content: space-between;
    // border: 1px solid black;
    align-items: center;
`
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style-type: none;
`

export const NavButton = styled.li`
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;
    background-color: ${(props) => (props.color ? props.color : '#ffffff')};
    &:hover {
        // opacity: 0.4;
        background-color: #005489;
    }
`
