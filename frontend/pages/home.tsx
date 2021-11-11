import React from 'react'
import DefaultLayout from '@templates/DefaultLayout'
import NavTabs from '@components/Tabs/Tabs'
import Header from '@components/Header/Header'

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <NavTabs />
        </DefaultLayout>
    )
}

export default Home
