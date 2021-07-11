import { url } from 'inspector'
import styled from 'styled-components'
import Link from 'next/link'
// TODO: Global Styles => https://blog.logrocket.com/using-styled-components-in-typescript-a-tutorial-with-examples/
export const NavContainer = styled.nav`
    a {
        color: white;
        text-align: center;
        padding: 16px;
        text-decoration: none;
        font-size: 24px;
    }
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    height: 150px;
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
    &:hover {
    }
`
