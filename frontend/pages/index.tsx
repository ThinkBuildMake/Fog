import React from 'react'
import DefaultLayout from '@templates/DefaultLayout'
import ProjectTable from '@components/Projects/ProjectTable'

const IndexPage: React.FC = () => {
    return (
        <DefaultLayout>
            <h1>Index Page</h1>
            <ProjectTable />
        </DefaultLayout>
    )
}

export default IndexPage
