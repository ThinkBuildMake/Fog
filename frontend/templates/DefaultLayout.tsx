import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import React from 'react'
import GlobalFonts from 'public/fonts/fonts'
import Footer from '@components/Footer/Footer'
import Header from '@components/Header/Header'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

// Template Taken from https://dev.to/rffaguiar/nextjs-typescript-styled-components-1i3m

const GlobalStyle = createGlobalStyle`
body, html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  a,h1,h2,h3,p,button{
      font-family: Poppins;
  }
`

const Background = styled.div`
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(
        165deg,
        rgba(47, 49, 56, 1) 0%,
        rgba(47, 48, 56, 1) 50%,
        rgba(255, 255, 255, 1) 100%
    );
`
const ChildBody = styled.div`
    position: absolute;
    width: 100%;
    padding: 2rem;
    top: 150px;
    box-sizing: border-box; // https://stackoverflow.com/questions/23397381/100-width-div-with-padding-showing-horizontal-scrollbar
    bottom: calc(
        2rem + 50px
    ); //Footer: 50px + padding 1rem *2 (one for top one for bottom)
`

const theme = createTheme({
    palette: {
        primary: {
            light: '#8e8e8e',
            main: '#616161',
            dark: '#373737'
        },
        secondary: {
            light: '#58a5f0',
            main: '#0277bd',
            dark: '#004c8c'
        }
    }
})

const DefaultLayout = ({ children }: { children: any }) => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalFonts />
                <GlobalStyle />
                <Background>
                    <Header />
                    <ChildBody>{children}</ChildBody>
                    <Footer />
                </Background>
            </ThemeProvider>
        </>
    )
}

export default DefaultLayout
