import React, { useState } from 'react'
import Tab from '../navigation/Tab'
import Tabs from '../navigation/Tabs'
import Box from '../layout/Box'
import RecordList from './RecordList'
import ActTemplates from './ActTemplates'

const RecordsView = () => {
    const [tab, setTab] = useState(1)

    return (
        <div className='max-w-full flex-col'>
            <Tabs>
                <Tab icon='table' tab={1} actualTab={tab} setTab={setTab}>Lista</Tab>
                <Tab icon='list' tab={2} actualTab={tab} setTab={setTab}>Plantilla act.</Tab>
            </Tabs>
            <Box>
                {tab === 1 ? <RecordList /> : <ActTemplates />}
            </Box>
        </div>
    )
}

export default RecordsView