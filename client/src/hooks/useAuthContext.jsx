import { useSelector, useDispatch } from 'react-redux'
import { userState, login, signup, loginWithToken, getUser } from '../redux/userSlice'

const useAuthContext = () => {
    const user_state = useSelector(userState)
    const dispatch = useDispatch()

    return { user_state, login, signup, loginWithToken, dispatch, getUser }
}

export default useAuthContext