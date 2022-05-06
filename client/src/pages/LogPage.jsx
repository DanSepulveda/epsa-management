import Box from '../components/atoms/Box'
import FormHeader from '../components/organisms/FormHeader'
import LogForm from '../components/organisms/LogForm'
import { useSelector } from 'react-redux'
import { userState } from '../redux/userSlice'

const LogPage = ({ tag }) => {
    const loading = useSelector(userState).loading

    if (loading) {
        return
    }

    return (
        <section className='min-h-full min-w-full m-auto absolute flex justify-center items-center px-3'>
            <Box>
                <FormHeader tag={tag} />
                <LogForm tag={tag} />
            </Box>
        </section>
    )
}

export default LogPage