import { withTheme } from '@material-ui/core'
import styled from 'styled-components'

export const RootDiv = withTheme(styled.div`
    //https://stackoverflow.com/questions/59831437/how-to-theme-components-with-styled-components-and-material-ui
    flex-grow: 1;
    background-color: ${(props) => props.theme.palette.background.paper};
    height: 100%;
`)

export const ContentDiv = withTheme(styled.div`
    flex-grow: 1;
    background-color: ${(props) => props.theme.palette.background.paper};
    height: 100%;
    width: 50%;
    align: center;
`)
