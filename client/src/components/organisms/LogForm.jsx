import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import SubmitButton from '../atoms/SubmitButton'
import InputText from '../molecules/InputText'

const LogForm = ({ tag }) => {
    const initialValues = { email: '', password: '' }

    const validationSchema = Yup.object({
        email: Yup.string().email('Correo inválido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido').min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres')
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => console.log(values)}
        >
            <Form className='w-full' style={{ 'minWidth': '20vw' }}>
                <InputText
                    label='Correo electrónico'
                    name='email'
                    id='email'
                    placeholder='ejemplo@ejemplo.com'
                />
                <InputText
                    label='Contraseña'
                    name='password'
                    id='password'
                    placeholder='Ingrese su contraseña'
                    type='password'
                />
                <SubmitButton>{tag === 'login' ? 'Ingresar' : 'Registrarme'}</SubmitButton>
            </Form>
        </Formik>
    )
}

export default LogForm