import Link from './Link'
import { RiCloseCircleFill } from 'react-icons/ri'

const MobileMenu = ({ setOpenNav }) => {
    return (
        <section className='sm:hidden absolute top-0 left-0 h-screen bg-gradient-to-b from-pink-500 to-pink-400 py-5 shrink-0'>
            <RiCloseCircleFill
                className='fill-pink-100 mr-3 text-4xl ml-auto mb-3 hover:fill-pink-500/80 cursor-pointer transition-all duration-300'
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