import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login, signup } from '../../redux/userSlice'
import { auth } from '../../firebase.config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import * as Yup from 'yup'
import { errorMessage } from '../../utils/messages'
import errorMessages from '../../app/errorMessages'
import { Formik, Form } from 'formik'
import InputText from '../input/InputText'
import SubmitButton from '../buttons/SubmitButton'

const LogForm = ({ tag }) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const handleSign = async ({ email, password }) => {
        setLoading(true)
        try {
            const response = tag === 'login'
                ? await signInWithEmailAndPassword(auth, email, password)
                : await createUserWithEmailAndPassword(auth, email, password)

            const token = response.user.accessToken

            tag === 'login'
                ? await dispatch(login(token))
                : await dispatch(signup(token))
        } catch (error) {
            errorMessage(errorMessages[error.code] || errorMessages.default)
        }
        setLoading(false)
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