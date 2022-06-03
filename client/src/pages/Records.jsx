import { useState } from 'react'
import useTitle from '../hooks/useTitle'
import AdminView from '../components/layout/AdminView'
import Tabs from '../components/navigation/Tabs'
import Tab from '../components/navigation/Tab'
import RecordList from '../components/admin/RecordList'
import ActTemplates from '../components/admin/ActTemplates'

const Records = () => {
    useTitle('Registros diarios')
    const [tab, setTab] = useState(1)

    return (
        <AdminView>
            <div className='max-w-full flex-col'>
                <Tabs actualTab={tab} setTab={setTab}>
                    <Tab icon='table' tab={1}>Lista</Tab>
                    <Tab icon='list' tab={2}>Plantillas</Tab>
                </Tabs>
                {tab === 1 ? <RecordList /> : <ActTemplates />}
            </div>
        </AdminView>
    )
}

export default Records