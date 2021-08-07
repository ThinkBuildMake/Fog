import React, { useContext, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Box from '@material-ui/core/Box'
import { ContentDiv, RootDiv } from './Styles'
import CheckOutTable from '@components/Table/ResourcesTable/CheckOutTable'
import { ProjectContext } from 'contexts/Project'
import CheckInTable from '@components/Table/ResourcesTable/CheckInTable'
import { TabPanel, a11yProps, LinkTab } from '@functions/customfuncs'
import { Resource } from '@functions/interfaces'

interface ResourcesTabsProps {
    resources: Resource[]
}
export default function ResourcesTabs(resources: ResourcesTabsProps) {
    const { project, setProject } = useContext(ProjectContext)
    const [currentTab, setCurrentTab] = React.useState(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurrentTab(newValue)
    }

    if (project) {
        return (
            <ContentDiv>
                <AppBar position="static" color="secondary">
                    <Tabs
                        value={currentTab}
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
                <TabPanel value={currentTab} index={0}>
                    <CheckOutTable resources={resources.resources} />
                </TabPanel>
                <TabPanel value={currentTab} index={1}>
                    <Box display="flex" justifyContent="center">
                        <CheckInTable resources={resources.resources} />
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
