import styled from 'styled-components'

export const FooterList = styled.ul`
    color: #ffffff;
    background-color: black;
    margin-bottom: -0.01rem; // Fixes Bug where footer background doesnt fill bottom completely
    padding: 1rem;
    position: fixed;
    height: 50px;
    bottom: 0;
    left: 0;
    width: 100%;
`

export const FooterLinks = styled.a`
    color: #ffffff;
    padding: 10px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    position: relative;
    top: -13px;
`
