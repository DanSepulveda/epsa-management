import useTitle from '../hooks/useTitle'
import AdminView from '../components/layout/AdminView'

const Archive = () => {
    useTitle('Archivos subidos')

    return (
        <AdminView>
            <section>Próximamente</section>
        </AdminView>
    )
}

export default Archive