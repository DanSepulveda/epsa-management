import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userState, clearUserState } from '../../redux/userSlice'
import { clearActivityState } from '../../redux/activitySlice'
import { clearRecordState } from '../../redux/recordSlice'
import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { HiMenu } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'
import MobileMenu from '../navigation/MobileMenu'

const Header = () => {
    const path = useLocation().pathname
    const [open, setOpen] = useState(false)
    const [openNav, setOpenNav] = useState(false)
    const dispatch = useDispatch()
    const username = useSelector(userState).username

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
        <div className='bg-white shadow-md px-3 sm:px-7 py-2 flex justify-between items-center max-w-full'>
            <div className='flex gap-3'>
                <HiMenu
                    className='text-3xl fill-pink-700 bg sm:hidden'
                    onClick={() => setOpenNav(true)}
                />
                <h1 className='text-lg font-bold text-rose-700'>{title[path]}</h1>
            </div>
            <div className='flex gap-3 items-center'>
                <p className='hidden md:block text-pink-700 font-medium'><span className='text-slate-700'>Hola </span>{username}</p>
                <img
                    src='/assets/minnie.png'
                    alt='Minnie'
                    onClick={() => setOpen(!open)}
                    className='cursor-pointer h-10'
                />
                {
                    open &&
                    <div className='absolute top-14 right-3 sm:right-7 rounded-md bg-pink-500 flex flex-col items-center py-4 px-5'>
                        <NavLink to='/profile' className='text-lg text-white hover:text-pink-900 transition-all duration-300'>Editar perfil</NavLink>
                        <p
                            className='cursor-pointer text-lg text-white hover:text-pink-900 transition-all duration-300'
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