import Link from './Link'

const AdminMenu = () => {
    return (
        <section className='hidden sm:block h-screen bg-gradient-to-b from-pink-500 to-pink-400 py-5 shrink-0'>
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

export default AdminMenu