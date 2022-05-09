import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { RiCloseCircleFill } from 'react-icons/ri'
import OverForm from '../layout/OverForm'
import InputText from '../input/InputText'
import TextArea from '../input/TextArea'
import SubmitButton from '../buttons/SubmitButton'
import { useDispatch } from 'react-redux'
import { createActivity } from '../../redux/activitiesSlice'
import { toast } from 'react-hot-toast'
import { successMessage, errorMessage } from '../../utils/messages'

const TemplateForm = ({ setOpen }) => {
    const dispatch = useDispatch()

    const handleSubmit = async (values, resetForm) => {
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

    return (
        <OverForm>
            <RiCloseCircleFill
                className='fill-pink-700 text-4xl ml-auto mb-3 hover:fill-pink-600 cursor-pointer'
                onClick={() => setOpen(false)}
            />
            <Formik
                initialValues={{ name: '', template: '' }}
                onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
            >
                <Form>
                    <InputText
                        name='name'
                        id='name'
                        label='Nombre de la actividad'
                        placeholder='Ej: Atención de apoderado'
                    />
                    <TextArea
                        name='template'
                        id='template'
                        label='Plantilla'
                        placeholder='Se realiza atención de apoderado de la estudiante **X** de 6° básico.'
                    />
                    <SubmitButton>Crear</SubmitButton>
                </Form>
            </Formik>
        </OverForm>
    )
}

export default TemplateForm