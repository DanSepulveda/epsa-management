import { Formik, Form } from 'formik'
import * as Yup from 'yup'
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
            <Form className='w-full'>
                <InputText
                    name='email'
                    id='email'
                    placeholder='Correo'
                />
                <InputText
                    label='Contraseña'
                    name='password'
                    id='password'
                    placeholder='Contraseña'
                    type='password'
                />
                <button type='submit' className='bg-gradient-to-r from-pink-600 to-pink-400 w-full py-3 text-white font-medium'>
                    {tag === 'login' ? 'Ingresar' : 'Registrarme'}
                </button>
            </Form>
        </Formik>
    )
}

export default LogForm