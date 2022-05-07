import { NavLink } from 'react-router-dom'
import { GoFile } from 'react-icons/go'
import { RiDashboardLine } from 'react-icons/ri'
import { useRef } from 'react'

const Link = ({ to, children }) => {
    const icon = {
        dashboard: <RiDashboardLine />
    }

    return (
        <NavLink to={to} className='custom-link flex items-center gap-2 pr-12 py-2 pl-4 rounded-l-full transition-all duration-300 w-full text-neutral-300 hover:text-white hover:font-normal'>
            <GoFile className='fill-white transition-all duration-300' />
            {children}
        </NavLink>
    )
}

export default Link