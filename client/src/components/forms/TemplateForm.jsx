import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { RiCloseCircleFill } from 'react-icons/ri'
import OverForm from '../layout/OverForm'
import InputText from '../input/InputText'
import TextArea from '../input/TextArea'
import SubmitButton from '../buttons/SubmitButton'

const TemplateForm = ({ setOpen }) => {
    return (
        <OverForm>
            <RiCloseCircleFill
                className='fill-pink-700 text-4xl ml-auto mb-3 hover:fill-pink-600 cursor-pointer'
                onClick={() => setOpen(false)}
            />
            <Formik
                initialValues={{ activity: '', template: '' }}
                onSubmit={(values) => console.log(values)}
            >
                <Form>
                    <InputText
                        name='activity'
                        id='activity'
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