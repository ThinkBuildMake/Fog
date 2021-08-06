import React, { useState } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { RootDiv } from './Styles'
import DataSetTable from '@components/Table/DataSetTable/DataSetTable'
import ResourcesTabs from './ResourcesTabs'
import { ProjectContext } from 'contexts/Project'

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

export default function NavTabs() {
    const [value, setValue] = useState(0)
    const [project, setProject] = useState(true) //TODO: setProject function

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
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
                Projects content goes here...
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProjectContext.Provider value={{ project, setProject }}>
                    <div
                        style={{
                            display: 'flex'
                        }}
                    >
                        <ResourcesTabs />
                    </div>
                </ProjectContext.Provider>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <DataSetTable />
            </TabPanel>
        </RootDiv>
    )
}
