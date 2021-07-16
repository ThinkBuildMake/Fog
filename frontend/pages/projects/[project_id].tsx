import { useRouter } from 'next/router'
import DefaultLayout from '@templates/DefaultLayout'
import NavTabs from '@components/Tabs/Tabs'
const ProjectView: React.FC = () => {
    const router = useRouter()
    const { project_id } = router.query
    return (
        <DefaultLayout>
            <h1>{project_id}</h1>
        </DefaultLayout>
    )
}

export default ProjectView
