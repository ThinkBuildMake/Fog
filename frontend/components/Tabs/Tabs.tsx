import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { RootDiv } from './Styles'
import Modal from '@components/Modal/Modal'
import { envs, getRequest, Sizes } from '@functions/customfuncs'
import ProjectForm from '@components/Forms/ProjectForm'
import DataSetTable from '@components/Table/DataSetTable/DataSetTable'
import ProjectTable from '@components/Projects/ProjectTable'

interface TabPanelProps {
    children?: React.ReactNode
    index: any
    value: any
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`nav-tabpanel-${index}`}
            aria-labelledby={`nav-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

function a11yProps(index: any) {
    return {
        id: `nav-tab-${index}`,
        'aria-controls': `nav-tabpanel-${index}`
    }
}

interface LinkTabProps {
    label?: string
    href?: string
}

function LinkTab(props: LinkTabProps) {
    return (
        <Tab
            component="a"
            onClick={(
                event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
                event.preventDefault()
            }}
            {...props}
        />
    )
}

interface Project {
    user_id: string
    description: string
    hardware_set: any
    title: string
    _id: { $oid: string }
}
export default function NavTabs() {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const [projects, setProjects] = useState([
        {
            id: 1,
            name: 'Sample Project 1',
            resourcesUsed: 5,
            date: '10/20/22'
        },
        {
            id: 2,
            name: 'Sample Project 10',
            resourcesUsed: 5,
            date: '10/20/22'
        },
        {
            id: 3,
            name: 'Sample Project 3',
            resourcesUsed: 5,
            date: '10/20/22'
        }
    ])

    useEffect(() => {
        getRequest(`${envs[process.env.appEnv]}/project/`).then((projs) => {
            const { data, status } = projs
            if (status == 200) {
                let filtered = data.map((item: Project, index) => {
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

    const filterProjects = (input) => {
        if (input.key == 'Enter') {
            setProjects(
                projects.filter((project) => project.id == input.target.value)
            )
        }
    }

    return (
        <RootDiv>
            <AppBar position="static">
                <Tabs
                    value={value}
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
            <TabPanel value={value} index={0}>
                <Modal
                    buttonOpenText="+"
                    modalContent={<ProjectForm />}
                    modalTitle="Create New Project"
                    buttonCloseText="Close"
                    size={Sizes.MEDIUM}
                    color="#2f3138"
                />
                <ProjectTable projects={projects} filter={filterProjects} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Resources content goes here...
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DataSetTable />
            </TabPanel>
        </RootDiv>
    )
}
