import useTitle from '../hooks/useTitle'
import LogView from '../components/layout/LogView'
import SignupForm from '../components/forms/SignupForm'

function SignUp() {
  useTitle('Registro')

  return (
    <LogView title="Crear cuenta">
      <SignupForm />
    </LogView>
  )
}

export default SignUp
