import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'
import React from 'react'
import GlobalFonts from 'public/fonts/fonts'

// Template Taken from https://dev.to/rffaguiar/nextjs-typescript-styled-components-1i3m

const GlobalStyle = createGlobalStyle`
body, html {
    height: 100%;
    width: 100%;
    margin: 0;
  }
  a,h1,h2,h3 {
      font-family: Poppins;
  }
`

const Background = styled.div`
    height: 100%;
    width: 100%;
    background-image: linear-gradient(
        165deg,
        rgba(47, 49, 56, 1) 0%,
        rgba(47, 48, 56, 1) 50%,
        rgba(255, 255, 255, 1) 100%
    );
`

const DefaultLayout = ({ children }: { children: any }) => {
    return (
        <>
            <GlobalFonts />
            <GlobalStyle />
            <Background>{children}</Background>
        </>
    )
}

export default DefaultLayout
