import { useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userState, clearUserState } from '../../redux/userSlice'
import { clearActivityState } from '../../redux/activitySlice'
import { clearRecordState } from '../../redux/recordSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { HiMenu } from 'react-icons/hi'
import MobileMenu from '../navigation/MobileMenu'

const Header = () => {
    const path = useLocation().pathname
    const { theme, username } = useSelector(userState)
    const { header, common } = theme
    const [open, setOpen] = useState(false)
    const [openNav, setOpenNav] = useState(false)
    const dispatch = useDispatch()

    const title = {
        '/': 'Resumen',
        '/records': 'Registros',
        '/reports': 'Informes',
        '/files': 'Archivos subidos',
        '/profile': 'Perfil'
    }

    const logout = async () => {
        await signOut(auth)
        dispatch(clearUserState())
        dispatch(clearActivityState())
        dispatch(clearRecordState())
    }

    return (
        <div className={`shadow-md px-3 sm:px-7 py-2 flex justify-between items-center max-w-full ${header.bg}`}>
            <div className='flex gap-3'>
                <HiMenu
                    className={`text-3xl bg sm:hidden ${header.icon}`}
                    onClick={() => setOpenNav(true)}
                />
                <h1 className={`text-lg font-bold ${header.h1}`}>{title[path]}</h1>
            </div>
            <div className='flex gap-3 items-center'>
                <p className={`hidden md:block font-medium ${header.name}`}>
                    <span className={header.greeting}>Hola </span>
                    {username}
                </p>
                <img
                    src='/assets/minnie.png'
                    alt='Minnie'
                    onClick={() => setOpen(!open)}
                    className={`cursor-pointer rounded-full h-10 border border-transparent ${header.avatar} ${common.transition}`}
                />
                {
                    open &&
                    <div
                        className={`absolute top-14 right-3 sm:right-7 rounded-md flex flex-col items-center py-4 px-5 ${header.menu}`}
                    >
                        <NavLink
                            to='/profile'
                            className={`text-lg py-1 ${header.link} ${common.transition}`}
                        >
                            Editar perfil
                        </NavLink>
                        <p
                            className={`cursor-pointer text-lg border-t py-1 ${header.link} ${common.transition}`}
                            onClick={logout}
                        >
                            Cerrar sessión
                        </p>
                    </div>
                }
                {
                    openNav && <MobileMenu setOpenNav={setOpenNav} />
                }
            </div>
        </div>
    )
}

export default Header