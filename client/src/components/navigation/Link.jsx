import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard, MdOutlinePendingActions } from 'react-icons/md'
import { BsFileEarmarkWord } from 'react-icons/bs'
import { RiFileCopy2Line } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'

const Link = ({ to, children }) => {
    const { theme } = useSelector(userState)
    const { menu, common } = theme

    const icons = {
        '/': <MdOutlineDashboard className={menu.icon} />,
        '/records': <MdOutlinePendingActions className={menu.icon} />,
        '/reports': <BsFileEarmarkWord className={menu.icon} />,
        '/files': <RiFileCopy2Line className={menu.icon} />,
        '/profile': <CgProfile className={menu.icon} />
    }

    return (
        <NavLink
            to={to}
            className={`custom-link flex items-center gap-2 pr-12 py-2 pl-4 rounded-l-full w-full ${common.transition} ${menu.link}`}
        >
            {icons[to]}
            {children}
        </NavLink>
    )
}

export default Link