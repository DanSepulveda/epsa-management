import React, { useState } from 'react'
import Tab from '../navigation/Tab'
import Tabs from '../navigation/Tabs'
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
            {tab === 1 ? <RecordList /> : <ActTemplates />}
        </div>
    )
}

export default RecordsView