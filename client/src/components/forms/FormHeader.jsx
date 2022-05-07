import { Fragment } from 'react'
import FormLink from './FormLink'

const FormHeader = ({ tag }) => {
    return (
        <Fragment>
            <img src='/assets/logo-epsa.png' alt='Logo EPSA' className='h-24 mx-auto mb-5' />
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