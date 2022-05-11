import { NavLink } from 'react-router-dom'
import { MdOutlineDashboard, MdOutlinePendingActions } from 'react-icons/md'
import { BsFileEarmarkWord } from 'react-icons/bs'
import { RiFileCopy2Line } from 'react-icons/ri'

const Link = ({ to, children }) => {
    const icons = {
        '/': <MdOutlineDashboard className='fill-white transition-all duration-300' />,
        '/records': <MdOutlinePendingActions className='fill-white transition-all duration-300' />,
        '/reports': <BsFileEarmarkWord className='fill-white transition-all duration-300' />,
        '/files': <RiFileCopy2Line className='fill-white transition-all duration-300' />
    }

    return (
        <NavLink to={to} className='custom-link flex items-center gap-2 pr-12 py-2 pl-4 rounded-l-full transition-all duration-300 w-full text-neutral-50 hover:text-pink-900 hover:font-normal'>
            {icons[to]}
            {children}
        </NavLink>
    )
}

export default Link