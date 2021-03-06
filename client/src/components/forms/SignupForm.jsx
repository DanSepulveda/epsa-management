import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import * as Yup from 'yup'
import { Formik, Form } from 'formik'
import { signup } from '../../redux/userSlice'
import { auth } from '../../firebase.config'
import { errorMessage } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import InputText from '../input/InputText'
import SubmitButton from '../buttons/SubmitButton'

function SignupForm() {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSign = async ({ email, password }) => {
    setLoading(true)
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const token = response.user.accessToken
      await dispatch(signup(token))
    } catch ({ code }) {
      errorMessage(getErrorMsg(code))
    }
    setLoading(false)
  }

  const validationSchema = Yup.object({
    email: Yup.string().email('Correo inválido').required('Campo requerido'),
    password: Yup.string()
      .min(8, 'Mínimo 8 caracteres')
      .max(16, 'Máximo 16 caracteres')
      .required('Campo requerido'),
  })

  const buttonText = loading ? 'Registrando' : 'Registrar'

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSign(values)}
    >
      <Form className="w-full" style={{ minWidth: '20vw' }}>
        <InputText
          label="Correo electrónico"
          name="email"
          id="email"
          placeholder="ejemplo@ejemplo.com"
        />
        <InputText
          label="Contraseña"
          name="password"
          id="password"
          placeholder="Ingrese su contraseña"
          type="password"
        />
        <SubmitButton loading={loading}>{buttonText}</SubmitButton>
      </Form>
    </Formik>
  )
}

export default SignupForm
