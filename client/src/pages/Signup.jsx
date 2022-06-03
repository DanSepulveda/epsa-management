import useTitle from '../hooks/useTitle'
import LogView from '../components/layout/LogView'
import SignupForm from '../components/forms/SignupForm'

const SignUp = () => {
    useTitle('Registro')

    return (
        <LogView title='Crear cuenta'>
            <SignupForm />
        </LogView>
    )
}

export default SignUp