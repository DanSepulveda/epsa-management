import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities, activitiesState } from '../../redux/activitiesSlice'
import IconButton from '../buttons/IconButton'
import TemplateForm from '../forms/TemplateForm'
import OverForm from '../layout/OverForm'
import ActRow from './ActRow'

const ActTemplates = () => {
    const [open, setOpen] = useState(false)
    const activities = useSelector(activitiesState).activities
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getActivities())
        //eslint-disable-next-line
    }, [])

    return (
        <div className='flex flex-col'>
            <div className='my-5 mx-auto'>
                <IconButton icon='plus' onClick={() => setOpen(true)}>
                    Nueva plantilla
                </IconButton>
            </div>
            <div className='grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {activities.map(activity => <ActRow key={activity._id} activity={activity} />)}
            </div>
            {open &&
                <OverForm setOpen={setOpen}>
                    <TemplateForm tag='new' data={null} editable={null} setEditable={null} />
                </OverForm>}
        </div>
    )
}

export default ActTemplates