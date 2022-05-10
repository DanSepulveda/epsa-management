import { Formik, Form } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { getRecords, editRecord, createRecord, recordsState } from '../../redux/recordSlice'
import { successMessage, errorMessage } from '../../utils/messages'
import InputText from '../input/InputText'
import TextArea from '../input/TextArea'
import SubmitButton from '../buttons/SubmitButton'
import { useEffect } from 'react'
import useDate from '../../hooks/useDate'

const RecordForm = ({ tag, data, editable, setEditable }) => {
    const dispatch = useDispatch()
    const records = useSelector(recordsState).records
    const date = useDate()
    const activities = []
    useEffect(() => {
        // console.log('entro')
        // if (!activities.length) dispatch(getActivities())
        //eslint-disable-next-line
    }, [])

    const create = async (values, resetForm) => {
        try {
            const response = await dispatch(createRecord(values))
            if (response.payload.success) {
                successMessage('Registro creado')
                resetForm()
            } else {
                throw new Error('Ha ocurrido un error. Intente más tarde')
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }

    const edit = async (values) => {
        const id = data._id
        try {
            const response = await dispatch(editRecord({ values, id }))
            if (response.payload.success) {
                successMessage('Registro editado')
                setEditable(false)
            } else {
                throw new Error('Ha ocurrido un error. Intente más tarde')
            }
        } catch (error) {
            errorMessage(error.message)
        }
    }

    const handleSubmit = (values, resetForm) => {
        tag === 'new' ? create(values, resetForm) : edit(values)
    }

    const initialValues = tag === 'new'
        ? { date, activity: '', description: '' }
        : { date: data.date, activity: data.activity, description: data.description }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => console.log(values)}
        >
            <Form>
                <InputText
                    name='date'
                    id='date'
                    label='Fecha'
                    type='date'
                />
                <datalist id='activityList' >
                    {activities.map(activity => <option key={activity._id} value={activity.name} />)}
                </datalist>
                <InputText
                    name='activity'
                    id='activity'
                    label='Nombre de la actividad'
                    list='activityList'
                    placeholder='Puede escribir o seleccionar desde la lista'
                />
                <TextArea
                    name='description'
                    id='description'
                    label='Descripción de la actividad'
                    placeholder='Ej: Se realiza evaluación psicométrica a la estudiante Johannis Barrios de 7° básico. '
                    disabled={tag === 'edit' && !editable ? true : false}
                    activities={activities}
                    dependent={true}
                />
                {
                    tag === 'new' || editable
                        ? <div className='w-24 mx-auto'>
                            <SubmitButton>
                                {tag === 'new' ? 'Crear' : 'Editar'}
                            </SubmitButton>
                        </div>
                        : null
                }
            </Form>
        </Formik >
    )
}

export default RecordForm