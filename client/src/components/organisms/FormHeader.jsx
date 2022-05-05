import { Fragment } from 'react'
import FormLink from '../atoms/FormLink'

const FormHeader = ({ tag }) => {
    return (
        <Fragment>
            <h1 className='uppercase text-3xl font-sans mb-4 text-center font-medium'>
                {tag === 'login' ? 'Ingresar' : 'Crear Cuenta'}
            </h1>
            <div className='flex w-full rounded overflow-hidden mb-6'>
                <FormLink to='/login'>Entrar</FormLink>
                <FormLink to='/signup'>Registrar</FormLink>
            </div>
        </Fragment>
    )
}

export default FormHeader