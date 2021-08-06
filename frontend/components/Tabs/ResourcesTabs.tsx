import React, { useContext } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { ContentDiv, RootDiv } from './Styles'
import CheckOutTable from '@components/Table/DataSetTable/CheckOutTable'
import { ProjectContext } from 'contexts/Project'
import CheckInTable from '@components/Table/DataSetTable/CheckInTable'

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

export default function ResourcesTabs() {
    const { project, setProject } = useContext(ProjectContext)
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }
    if (project) {
        return (
            <ContentDiv>
                <AppBar position="static" color="secondary">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                        centered
                    >
                        <LinkTab
                            label="Check Out"
                            href="/check-out"
                            {...a11yProps(0)}
                        />
                        <LinkTab
                            label="Check In"
                            href="/check-in"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <CheckOutTable />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Box display="flex" justifyContent="center">
                        <CheckInTable />
                    </Box>
                </TabPanel>
            </ContentDiv>
        )
    } else {
        return (
            <div>
                <h1>No Project Selected</h1>
                <h3>
                    Please select or create a new project in the Projects tab
                </h3>
            </div>
        )
    }
}
