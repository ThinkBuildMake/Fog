import React from 'react'
import Header from '@components/Header/Header'
import DefaultLayout from '@templates/DefaultLayout'
import NavTabs from '@components/Navigation/Tabs'
import Modal from '@components/Modal/Modal'
import { Sizes } from '@functions/customfuncs'
import SignInForm from '@components/Forms/SignInForm'
// import GenericButton from '@components/Button/Generic/GenericButton'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'

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

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <Header />
            <ThemeProvider theme={theme}>
                <NavTabs />
            </ThemeProvider>
        </DefaultLayout>
    )
}

export default Home
