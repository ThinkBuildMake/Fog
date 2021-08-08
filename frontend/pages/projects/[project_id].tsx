import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DefaultLayout from '@templates/DefaultLayout'
import styled from 'styled-components'
import BillingTable from '@components/Table/BillingTable/BillingTable'
import GenericButton from '@components/Button/Generic/GenericButton'
import { Sizes } from '@functions/customfuncs'
interface BillingItem {
    title: string
    price: number
    quantity: number
    hours: number
    cost: number
}
interface Project {
    title: string
    project_id: string
    description: string
    billing: BillingItem[] | undefined
}
const ProjectView: React.FC = () => {
    const router = useRouter()
    const [project, setProject] = useState<Project>({
        title: '',
        project_id: '',
        description: '',
        billing: null
    })
    useEffect(() => {
        //TODO: Call function

        setProject({
            title: 'My Project',
            project_id: 'X Æ A-12',
            description:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lorem purus, mattis eget fringilla quis, volutpat id sem. Sed at purus eget lectus hendrerit imperdiet. Curabitur ut nisi id erat posuere malesuada. Aliquam accumsan quam ut lorem gravida, vel aliquam mauris lacinia. Maecenas quis lectus nunc. In tincidunt bibendum velit, eget mattis enim malesuada maximus. Nunc placerat nibh nec diam luctus eleifend a in orci. Donec pellentesque tempor sapien, quis sagittis diam aliquam sit amet. Curabitur vitae nisl egestas, aliquam sapien eu, fermentum justo. Nullam quis pretium lacus, sit amet congue orci. Integer a ex quis quam fermentum ultricies.',
            billing: [
                {
                    title: 'HW Set 1',
                    price: 0.15,
                    quantity: 18,
                    hours: 16,
                    cost: 43.2
                },
                {
                    title: 'HW Set 2',
                    price: 0.2,
                    quantity: 15,
                    hours: 5.5,
                    cost: 16.5
                },
                {
                    title: 'HW Set 3',
                    price: 0.22,
                    quantity: 4,
                    hours: 22,
                    cost: 19.36
                },
                {
                    title: 'HW Set 4',
                    price: 0.15,
                    quantity: 18,
                    hours: 16,
                    cost: 43.2
                },
                {
                    title: 'HW Set 5',
                    price: 0.2,
                    quantity: 15,
                    hours: 5.5,
                    cost: 16.5
                },
                {
                    title: 'HW Set 6',
                    price: 0.22,
                    quantity: 4,
                    hours: 22,
                    cost: 19.36
                }
            ]
        })
    }, [])
    const { project_id } = router.query
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
