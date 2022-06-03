import Box from './Box'
import FormLink from '../navigation/FormLink'

const LogView = ({ title, children }) => {
    return (
        <section className='min-h-full min-w-full m-auto absolute flex justify-center items-center px-3 bg-pink-200'>
            <Box>
                <div className='px-4 py-6'>
                    <img src='/assets/logo-epsa.png' alt='Logo EPSA' className='h-20 mx-auto mb-5' />
                    <h1 className='text-3xl mb-3 text-center font-medium font-ubuntu text-pink-700'>
                        {title}
                    </h1>
                    <div className='flex rounded overflow-hidden mb-6'>
                        <FormLink to='/login'>Entrar</FormLink>
                        <FormLink to='/signup'>Registrar</FormLink>
                    </div>
                    {children}
                </div>
            </Box>
        </section>
    )
}

export default LogView