import { useDispatch, useSelector } from 'react-redux'
import { login, signup, userState } from '../../redux/userSlice'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from '../input/InputText'
import SubmitButton from '../buttons/SubmitButton'
import { errorMessage } from '../../utils/messages'

const LogForm = ({ tag }) => {
    const dispatch = useDispatch()
    const loading = useSelector(userState).loading

    const handleSign = async (values) => {
        try {
            const response = tag === 'login' ? await dispatch(login(values)) : await dispatch(signup(values))
            const { success, message } = response.payload
            if (!success) throw new Error(message)
        } catch (error) {
            errorMessage(error.message)
        }
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Correo inválido').required('Campo requerido'),
        password: Yup.string().min(8, 'Mínimo 8 caracteres').max(16, 'Máximo 16 caracteres').required('Campo requerido')
    })

    const buttonText = tag === 'login' && loading
        ? 'Ingresando'
        : tag === 'login' && !loading
            ? 'Ingresar'
            : loading
                ? 'Registrando'
                : 'Registrar'

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
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
                <SubmitButton loading={loading}>
                    {buttonText}
                </SubmitButton>
            </Form>
        </Formik>
    )
}

export default LogForm