import Link from './Link'

const PanelMenu = () => {
    return (
        <section className='h-screen bg-gradient-to-b from-pink-900 to-pink-700 py-5 hidden sm:block'>
            <img src='/assets/logo-epsa.png' alt='Logo Epsa' className='h-24 mx-auto mb-5' />
            <nav className='pl-3 flex flex-col items-start'>
                <Link to='/'>Resumen</Link>
                <Link to='/records'>Registros diarios</Link>
                <Link to='/reports'>Informes</Link>
            </nav>
        </section>
    )
}

export default PanelMenu