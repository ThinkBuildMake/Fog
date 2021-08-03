import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import ProjectTable from '@components/Projects/ProjectTable'
import { useState } from 'react'

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
                    <Typography>{children}</Typography>
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

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper
    }
}))

export default function NavTabs() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const [projects, setProject] = useState([
        {
            id: 1,
            name: 'Sample Project 1',
            description: 'This is a sample description',
            resourcesUsed: 5,
            date: '10/20/22'
        },
        {
            id: 2,
            name: 'Sample Project 10',
            description: 'This is a sample description',
            resourcesUsed: 5,
            date: '10/20/22'
        },
        {
            id: 3,
            name: 'Sample Project 3',
            description: 'This is a sample description',
            resourcesUsed: 5,
            date: '10/20/22'
        }
    ])

    const filterProjects = (input) => {
        if (input.key == 'Enter') {
            setProject(
                projects.filter((project) => project.id == input.target.value)
            )
        }
    }

    return (
        <div className={classes.root}>
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
                <ProjectTable projects={projects} filter={filterProjects} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                Resources content goes here...
            </TabPanel>
            <TabPanel value={value} index={2}>
                Datasets content goes here...
            </TabPanel>
        </div>
    )
}
