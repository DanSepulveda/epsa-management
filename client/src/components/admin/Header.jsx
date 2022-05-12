import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userState, clearUserState } from '../../redux/userSlice'
import { clearActivityState } from '../../redux/activitySlice'
import { clearRecordState } from '../../redux/recordSlice'
import { useState } from 'react'
import Link from '../navigation/Link'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase.config'
import { HiMenu } from 'react-icons/hi'

const Header = () => {
    const path = useLocation().pathname
    const email = useSelector(userState).email
    const [open, setOpen] = useState(false)
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
        <div className='bg-white shadow-md px-3 sm:px-7 py-2 flex justify-between items-center max-w-full'>
            <div className='flex gap-3'>
                <HiMenu className='text-3xl fill-pink-700 bg md:hidden' />
                <h1 className='text-lg font-bold text-rose-700'>{title[path]}</h1>
            </div>
            <div className='flex gap-3 items-center'>
                <p>{`Bienvenido ${email}`}</p>
                <div
                    className='bg-pink-700 rounded-full cursor-pointer'
                    style={{ 'width': '40px', 'height': '40px' }}
                    onClick={() => setOpen(!open)}
                >
                </div>
                {
                    open &&
                    <div className='absolute top-14 right-7 bg-pink-600 rounded-md '>
                        <Link to='/profile'>Editar perfil</Link>
                        <p className='text-center cursor-pointer' onClick={logout}>Cerrar sessión</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header