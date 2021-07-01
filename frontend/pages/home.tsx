import React from 'react'
import Header from '@components/Header/Header'
import DefaultLayout from '@templates/DefaultLayout'
import Modal from '@components/Modal/Modal'
import { Sizes } from '@functions/customfuncs'
import SignInForm from '@components/Forms/SignInForm'
// import GenericButton from '@components/Button/Generic/GenericButton'

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <Header />
        </DefaultLayout>
    )
}

export default Home
