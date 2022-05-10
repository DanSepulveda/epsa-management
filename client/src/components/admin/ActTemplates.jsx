import { useState } from 'react'
import { useSelector } from 'react-redux'
import { activityState } from '../../redux/activitySlice'
import IconButton from '../buttons/IconButton'
import TemplateForm from '../forms/TemplateForm'
import OverForm from '../layout/OverForm'
import ActRow from './ActRow'

const ActTemplates = () => {
    const [open, setOpen] = useState(false)
    const activities = useSelector(activityState).activities

    const message = !activities.length
        ? <h1>no existen plantillas</h1> //revisar 
        : null

    return (
        <div className='flex flex-col'>
            <div className='mt-6 mb-9 mx-auto flex items-center'>
                <h2 className='text-center text-2xl mr-3'>{`Plantillas (${activities.length})`}</h2>
                <IconButton icon='plus' onClick={() => setOpen(true)}>
                    Nueva
                </IconButton>
            </div>
            {message}
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {activities.map(activity => <ActRow key={activity._id} activity={activity} />)}
            </div>
            {
                open &&
                <OverForm setOpen={setOpen}>
                    <TemplateForm tag='new' data={null} editable={null} setEditable={null} />
                </OverForm>
            }
        </div>
    )
}

export default ActTemplates