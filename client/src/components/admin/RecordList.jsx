import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities, activitiesState } from '../../redux/activitiesSlice'
import IconButton from '../buttons/IconButton'
import RecordForm from '../forms/RecordForm'
import TemplateForm from '../forms/TemplateForm'
import OverForm from '../layout/OverForm'
import ActRow from './ActRow'

const RecordList = () => {
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
                    Nuevo registro
                </IconButton>
            </div>
            {open &&
                <OverForm setOpen={setOpen}>
                    <RecordForm tag='new' data={null} editable={null} setEditable={null} />
                </OverForm>}
        </div>
    )
}

export default RecordList

    // <div className='bg-white shadow-md rounded flex p-2'>
    //     <input
    //         className='border border-pink-600'
    //         placeholder='Buscar registro...'
    //     />
    // </div>


    // <div className='flex gap-4 items-center justify-center mb-5'>
    //     <h2 className='text-2xl'>Mayo 2022</h2>
    //     <IconButton icon='plus' onClick={() => setOpen(true)}>Nuevo</IconButton>
    // </div>

            // {open && <NewRecordForm />}
        // <select>
        //     <option value="">hola</option>
        //     <option value=""><input /></option>
        // </select>
