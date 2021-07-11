import React from 'react'
import Header from '@components/Header/Header'
import DefaultLayout from '@templates/DefaultLayout'
import Footer from '@components/Footer/Footer'

const IndexPage: React.FC = () => {
    return (
        <DefaultLayout>
            <Header />
            <Footer />
        </DefaultLayout>
    )
}

export default IndexPage
