import Box from '../components/atoms/Box'
import Main from '../components/atoms/Main'
import FormHeader from '../components/organisms/FormHeader'
import LogForm from '../components/organisms/LogForm'


const LogPage = ({ tag }) => {
    return (
        <section className='h-screen flex justify-center items-center px-3'>
            <Box>
                <FormHeader tag={tag} />
                <LogForm tag={tag} />
            </Box>
        </section>
    )
}

export default LogPage