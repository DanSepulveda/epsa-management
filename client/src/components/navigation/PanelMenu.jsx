import { NavLink } from "react-router-dom"
import { GoFile } from 'react-icons/go'

const PanelMenu = () => {
    return (
        <section className='h-screen bg-gradient-to-b from-pink-600 to-pink-400 px-10 py-5'>
            <img src='/assets/logo-epsa.png' alt='Logo Epsa' className='h-24 mx-auto mb-5' />
            <nav>
                <NavLink to='/' className='flex justify-center items-center gap-2 mb-5'>
                    <GoFile />
                    Informe Mensual
                </NavLink>
                <NavLink to='/' className='flex justify-center items-center gap-2 mb-5'>
                    <GoFile />
                    Informe Mensual
                </NavLink>
                <NavLink to='/' className='flex justify-center items-center gap-2 mb-5'>
                    <GoFile />
                    Informe Mensual
                </NavLink>
            </nav>
        </section>
    )
}

export default PanelMenu