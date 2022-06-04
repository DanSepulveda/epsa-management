import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import Link from './Link'

function AdminMenu() {
  const { theme } = useSelector(userState)
  const { menu } = theme

  return (
    <section className={`hidden sm:block h-screen py-5 shrink-0 ${menu.bg}`}>
      <img src="/assets/logo-epsa.png" alt="Logo Epsa" className="h-20 mx-auto mb-5" />
      <nav className="pl-3 flex flex-col items-start">
        <Link to="/">Resumen</Link>
        <Link to="/students">Alumnos</Link>
        <Link to="/records">Registros diarios</Link>
        <Link to="/reports">Informes</Link>
        <Link to="/files">Archivos</Link>
      </nav>
    </section>
  )
}

export default AdminMenu
