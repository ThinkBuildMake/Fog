import styled from 'styled-components'
import { determineButtonSize, Sizes } from '@functions/customfuncs'
// Taken From:  https://fdossena.com/?p=html5cool/buttons/i.frag
export const Button = styled.button<{ sizeParam: Sizes; color?: string }>`
    display: inline-block;
    padding: 0.4em 1em;
    margin: 0 0.3em 0.3em 0;
    border-radius: 0.2em;
    box-sizing: border-box;
    text-decoration: none;
    font-family: Poppins;
    font-size: 24px;
    font-weight: 400;
    color: #ffffff;
    background-color: ${(props) => (props.color ? props.color : '#3369ff')};
    box-shadow: inset 0 -0.6em 1em -0.35em rgba(0, 0, 0, 0.17),
        inset 0 0.6em 2em -0.3em rgba(255, 255, 255, 0.15),
        inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
    text-align: center;
    position: relative;
    width: ${(props) => determineButtonSize(props.sizeParam)};
    &:active {
        box-shadow: inset 0 0.6em 2em -0.3em rgba(0, 0, 0, 0.15),
            inset 0 0 0em 0.05em rgba(255, 255, 255, 0.12);
    }
    cursor: pointer;
`
