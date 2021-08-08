import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@templates/DefaultLayout'
import styled from 'styled-components'
import BillingTable from '@components/Table/BillingTable/BillingTable'
import {
    envs,
    getDiffFromTimeStampsInWholeHours,
    getRequest
} from '@functions/customfuncs'
interface BillingItem {
    title: string
    price: number
    quantity: number
    hours: number
    cost: number
}
interface Project {
    title: string
    project_id: string | string[]
    description: string
    billing: BillingItem[] | undefined
}
// interface Project{
//     user_id: string
//     description: string
//     hardware_set: any
//     title: string
//     _id: {"$oid": string}
// }
const ProjectView: React.FC = () => {
    const router = useRouter()
    const [project, setProject] = useState<Project>({
        title: '',
        project_id: '',
        description: '',
        billing: null
    })
    const { project_id } = router.query
    useEffect(() => {
        //TODO: Type all of these
        getRequest(`${envs[process.env.appEnv]}/project/${project_id}`).then(
            (proj) => {
                const { data, status } = proj
                if (status == 200) {
                    // Get every
                    let billingInfo = Promise.all(
                        Object.keys(data.hardware_set).map(
                            (hardware_id, index) => {
                                let resp = getRequest(
                                    `${
                                        envs[process.env.appEnv]
                                    }/hardware/${hardware_id}`
                                ).then((resource) => {
                                    // Calculate the Average Hours used
                                    let hours = 0
                                    let value =
                                        data.hardware_set[hardware_id].time
                                    let totalQuantity =
                                        data.hardware_set[hardware_id].qty
                                    value.forEach((element) => {
                                        // Multiply by 1000 to convert from s to ms
                                        let timestamp = element[0] * 1000,
                                            qty = element[1]
                                        const diff =
                                            getDiffFromTimeStampsInWholeHours(
                                                Date.now(),
                                                timestamp
                                            )
                                        const weight = qty / totalQuantity
                                        hours += diff * weight
                                    })
                                    return {
                                        title: resource.data.title,
                                        price: resource.data.price.toFixed(2),
                                        quantity:
                                            data.hardware_set[hardware_id].qty,
                                        hours: hours,
                                        cost: hours * resource.data.price
                                    }
                                })
                                return resp
                            }
                        )
                    ).then((billing) => {
                        setProject({
                            title: data.title,
                            project_id: project_id,
                            description: data.description,
                            billing: billing
                        })
                    })
                }
            }
        )
    }, [])
    const Outline = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
    `
    const Background = styled.div`
        background: white;
        height: 100%;
        box-sizing: border-box;
        padding: 24px;
    `
    const TopBox = styled.div`
        display: flex;
        width: 70%;
        flex-wrap: wrap;
        .topline {
            height: 70px;
            display: flex;
            justify-content: space-between;
            width: 100%;
        }
    `
    const Description = styled.p`
        border: 1px solid black;
        padding: 10px;
        max-height: 100px;
        overflow-y: auto;
    `
    const BottomBox = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 90%;
        height: 100%;
    `
    const BackButton = styled.button`
        text-decoration: none;
        background-color: #c4c4c4;
        color: black;
        border: 1px solid black;
        padding: 5px 16px 5px 16px;
        border-radius: 4px;
        cursor: pointer;
    `

    return (
        <DefaultLayout>
            <Background>
                <BackButton
                    onClick={() => {
                        router.push('../home')
                    }}
                >
                    Back to Projects
                </BackButton>
                <Outline>
                    <TopBox>
                        <div className="topline">
                            <h1>{project.title}</h1>
                            <h1>Project ID: {project.project_id}</h1>
                        </div>
                        <div>
                            <h3>Description</h3>
                            <Description>{project.description}</Description>
                        </div>
                    </TopBox>
                    <BottomBox>
                        <h1>Billing for Current Month</h1>
                        {project.billing !== null && (
                            <BillingTable data={project.billing} />
                        )}
                    </BottomBox>
                </Outline>
            </Background>
        </DefaultLayout>
    )
}

export default ProjectView
