import React, { useEffect, useReducer, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import { RootDiv } from './Styles'
import Modal from '@components/Modal/Modal'
import { envs, getRequest, Sizes } from '@functions/customfuncs'
import ProjectForm from '@components/Forms/ProjectForm'
import DataSetTable from '@components/Table/DataSetTable/DataSetTable'
import ResourcesTabs from './ResourcesTabs'
import { ResourceContext } from 'contexts/Resources'
import { ProjectContext } from 'contexts/Project'
import { TabPanel, a11yProps, LinkTab } from '@functions/customfuncs'
import {
    ResourcesReducer,
    ActionKind,
    initialState
} from 'reducers/ResourcesReducer'
//import ProjectTable from '@components/Projects/ProjectTable'
import ProjectsTable from '@components/Table/ProjectsTable/ProjectsTable'

interface Project {
    user_id: string
    description: string
    hardware_set: any
    title: string
    _id: { $oid: string }
}
export default function NavTabs() {
    const [currentTab, setCurrentTab] = useState(0)
    const [project, setProject] = useState(true) //TODO: setProject function
    const [state, dispatch] = useReducer(ResourcesReducer, initialState)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue)
    }
    // Load in the Hardware Resources
    useEffect(() => {
        getRequest(`${envs[process.env.appEnv]}/hardware/`).then(
            (resources) => {
                dispatch({
                    index: 0,
                    payload: 0,
                    type: ActionKind.Load,
                    retrievedState: resources.data
                })
            }
        )
    }, [])

    const [projects, setProjects] = useState([])

    //User is defined by their email
    useEffect(() => {
        getRequest(`${envs[process.env.appEnv]}/project/`).then((projs) => {
            const { data, status } = projs
            if (status == 200) {
                let filtered = data.map((item: Project) => {
                    let resourcesSum = 0
                    for (const hardware_id in item.hardware_set) {
                        resourcesSum += item.hardware_set[hardware_id]['qty']
                    }
                    return {
                        id: item._id.$oid,
                        name: item.title,
                        resourcesUsed: resourcesSum,
                        date: '10/20/22'
                    }
                })
                setProjects(filtered)
            }
        })
    }, [])

    // const filterProjects = (input) => {
    //     if (input.key == 'Enter') {
    //         setProjects(
    //             projects.filter((project) => project.id == input.target.value)
    //         )
    //     }
    // }

    return (
        <RootDiv>
            <AppBar position="static">
                <Tabs
                    value={currentTab}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                    centered
                >
                    <LinkTab
                        label="Projects"
                        href="/drafts"
                        {...a11yProps(0)}
                    />
                    <LinkTab
                        label="Resources"
                        href="/trash"
                        {...a11yProps(1)}
                    />
                    <LinkTab label="Datasets" href="/spam" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={currentTab} index={0}>
                <Modal
                    buttonOpenText="+"
                    modalContent={ProjectForm}
                    modalTitle="Create New Project"
                    buttonCloseText="Close"
                    size={Sizes.MEDIUM}
                    color="#2f3138"
                />
                <ProjectsTable projects={projects} />
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
                <ProjectContext.Provider value={{ project, setProject }}>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <ResourceContext.Provider value={{ state, dispatch }}>
                            <ResourcesTabs />
                        </ResourceContext.Provider>
                    </div>
                </ProjectContext.Provider>
            </TabPanel>
            <TabPanel value={currentTab} index={2}>
                <DataSetTable />
            </TabPanel>
        </RootDiv>
    )
}
