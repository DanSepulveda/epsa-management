import { useDispatch } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import SubmitButton from '../atoms/SubmitButton'
import InputText from '../molecules/InputText'
import { login, signup } from '../../redux/userSlice'

const LogForm = ({ tag }) => {
    const dispatch = useDispatch()

    const handleSign = async (values) => {
        try {
            const response = tag === 'login' ? await dispatch(login(values)) : await dispatch(signup(values))
            const { success, message } = response.payload
            if (!success) throw new Error(message)
        } catch (error) {
            console.log(error.message)
        }
    }

    const initialValues = { email: '', password: '' }

    const validationSchema = Yup.object({
        email: Yup.string().email('Correo inválido').required('Campo requerido'),
        password: Yup.string().required('Campo requerido').min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres')
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={values => handleSign(values)}
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