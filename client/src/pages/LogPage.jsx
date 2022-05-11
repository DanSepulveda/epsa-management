import useTitle from '../hooks/useTitle'
import Box from '../components/layout/Box'
import LogForm from '../components/forms/LogForm'
import FormLink from '../components/navigation/FormLink'

const LogPage = ({ tag }) => {
    const title = tag === 'login' ? 'Ingresar' : 'Registro'
    useTitle(title)

    return (
        <section className='min-h-full min-w-full m-auto absolute flex justify-center items-center px-3 bg-pink-200'>
            <Box>
                <div className='px-4 py-6'>
                    <img src='/assets/logo-epsa.png' alt='Logo EPSA' className='h-20 mx-auto mb-5' />
                    <h1 className='text-3xl mb-3 text-center font-medium font-ubuntu text-pink-700'>
                        {tag === 'login' ? 'Ingresar' : 'Crear cuenta'}
                    </h1>
                    <div className='flex rounded overflow-hidden mb-6'>
                        <FormLink to='/login'>Entrar</FormLink>
                        <FormLink to='/signup'>Registrar</FormLink>
                    </div>
                    <LogForm tag={tag} />
                </div>
            </Box>
        </section>
    )
}

export default LogPage