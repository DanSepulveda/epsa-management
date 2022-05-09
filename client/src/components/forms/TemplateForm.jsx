import { Formik, Form } from 'formik'
import { useDispatch } from 'react-redux'
import { createActivity, editActivity } from '../../redux/activitiesSlice'
import { successMessage, errorMessage } from '../../utils/messages'
import InputText from '../input/InputText'
import TextArea from '../input/TextArea'
import SubmitButton from '../buttons/SubmitButton'

const TemplateForm = ({ tag, data, editable, setEditable }) => {
    const dispatch = useDispatch()

    const create = async (values, resetForm) => {
        try {
            const response = await dispatch(createActivity(values))
            if (response.payload.success) {
                successMessage('Actividad creada')
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
            const response = await dispatch(editActivity({ values, id }))
            if (response.payload.success) {
                successMessage('Actividad editada')
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
        ? { name: '', template: '' }
        : { name: data.name, template: data.template }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        >
            <Form>
                <InputText
                    name='name'
                    id='name'
                    label='Nombre de la actividad'
                    placeholder='Ej: Atención de apoderado'
                    disabled={tag === 'edit' && !editable ? true : false}
                />
                <TextArea
                    name='template'
                    id='template'
                    label='Plantilla'
                    placeholder='Se realiza atención de apoderado de la estudiante **X** de 6° básico.'
                    disabled={tag === 'edit' && !editable ? true : false}
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
        </Formik>
    )
}

export default TemplateForm