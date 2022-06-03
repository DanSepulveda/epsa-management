import Link from './Link'
import { RiCloseCircleFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'

const MobileMenu = ({ setOpenNav }) => {
    const { theme } = useSelector(userState)
    const { menu } = theme

    return (
        <section className={`sm:hidden absolute h-screen py-5 shrink-0 ${menu.bg} menu`}>
            <RiCloseCircleFill
                className={`mr-3 text-4xl ml-auto mb-3 cursor-pointer ${menu.close}`}
                onClick={() => setOpenNav(false)}
            />
            <img src='/assets/logo-epsa.png' alt='Logo Epsa' className='h-20 mx-auto mb-5' />
            <nav className='pl-3 flex flex-col items-start'>
                <Link to='/'>Resumen</Link>
                <Link to='/records'>Registros diarios</Link>
                <Link to='/reports'>Informes</Link>
                <Link to='/files'>Archivos</Link>
            </nav>
        </section>
    )
}

export default MobileMenu