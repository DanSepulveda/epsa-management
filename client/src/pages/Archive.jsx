import useTitle from '../hooks/useTitle'
import AdminView from '../components/layout/AdminView'
import ArchiveView from '../components/admin/ArchiveView'

const Archive = () => {
    useTitle('Archivos subidos')

    return (
        <AdminView>
            <ArchiveView />
        </AdminView>
    )
}

export default Archive