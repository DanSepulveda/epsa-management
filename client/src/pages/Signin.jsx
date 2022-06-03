import useTitle from '../hooks/useTitle'
import LogView from '../components/layout/LogView'
import SigninForm from '../components/forms/SigninForm'

const SignIn = () => {
    useTitle('Ingresar')

    return (
        <LogView title='Ingresar'>
            <SigninForm />
        </LogView>
    )
}

export default SignIn