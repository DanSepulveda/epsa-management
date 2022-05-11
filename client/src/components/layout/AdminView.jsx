import { NavLink } from 'react-router-dom'
import Header from '../admin/Header'
import AdminMenu from '../navigation/AdminMenu'

const AdminView = ({ children }) => {

    return (
        <section className='flex h-screen max-w-full'>
            <AdminMenu />
            <section className='w-screen overflow-hidden w-full max-w-full flex flex-col sm:flex-1'>
                <Header />
                <div className='px-3 sm:px-7 py-5 flex-1 flex flex-col overflow-y-scroll max-w-full'>
                    {children}
                </div>
                <footer className='sm:hidden bg-white shadow-inner py-3 text-center flex gap-3'>
                    <NavLink to='/records'>Registros</NavLink>
                    <NavLink to='/reports'>Informes</NavLink>
                </footer>
            </section>
        </section>
    )
}

export default AdminView