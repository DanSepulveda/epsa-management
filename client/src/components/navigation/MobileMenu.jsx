import Link from './Link'
import { RiCloseCircleFill } from 'react-icons/ri'
import themes from '../../app/themes'

const MobileMenu = ({ setOpenNav }) => {
    const { menu } = themes.default

    return (
        <section className={`sm:hidden absolute top-0 left-0 h-screen py-5 shrink-0 ${menu.bg}`}>
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