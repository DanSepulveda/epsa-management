import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities, activityState } from '../../redux/activitySlice'
import { getRecords, recordState } from '../../redux/recordSlice'
import IconButton from '../buttons/IconButton'
import RecordForm from '../forms/RecordForm'
import OverForm from '../layout/OverForm'
import RecordRow from './RecordRow'

const RecordList = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const activities = useSelector(activityState).activities
    const { records, fetching, fetched } = useSelector(recordState)

    useEffect(() => {
        if (!activities.length) dispatch(getActivities())
        if (!records.length) dispatch(getRecords())
        //eslint-disable-next-line
    }, [])

    const message = fetched && !records.length
        ? <h1>no hay registros</h1> //revisar 
        : fetching
            ? <h1>buscando registros</h1> //revisar 
            : null

    return (
        <div className='flex flex-col'>
            <div className='mt-6 mb-9 mx-auto flex items-center'>
                <h2 className='text-center text-2xl mr-3'>{`Registros (${records.length})`}</h2>
                <IconButton icon='plus' onClick={() => setOpen(true)}>
                    Nuevo
                </IconButton>
            </div>
            {message}
            <div className='flex flex-col gap-2'>
                {records.map(record => <RecordRow key={record._id} record={record} />)}
            </div>
            {
                open &&
                <OverForm setOpen={setOpen}>
                    <RecordForm tag='new' data={null} editable={null} setEditable={null} />
                </OverForm>
            }
        </div>
    )
}

export default RecordList