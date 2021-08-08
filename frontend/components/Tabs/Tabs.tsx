import React, {
    createContext,
    Reducer,
    useEffect,
    useReducer,
    useState
} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import { RootDiv } from './Styles'
import DataSetTable from '@components/Table/DataSetTable/DataSetTable'
import ResourcesTabs from './ResourcesTabs'
import { ResourceContext } from 'contexts/Resources'
import { ProjectContext } from 'contexts/Project'
import { envs, getRequest } from '@functions/customfuncs'
import { TabPanel, a11yProps, LinkTab } from '@functions/customfuncs'
import {
    ResourcesReducer,
    ActionKind,
    initialState
} from '@reducers/ResourcesReducer'

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
                Projects content goes here...
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
