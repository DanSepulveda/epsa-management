import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'

const Tabs = ({ children }) => {
    const { theme } = useSelector(userState)
    const { tabs } = theme

    return (
        <div className={`flex w-fit ${tabs.bg}`}>
            {children}
        </div>
    )
}

export default Tabs