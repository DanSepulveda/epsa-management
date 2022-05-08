import AdminView from '../components/layout/AdminView'
import RecordsView from '../components/admin/RecordsView'
import useTitle from '../hooks/useTitle'

const Records = () => {
    useTitle('Registros diarios')

    return (
        <AdminView>
            <RecordsView />
        </AdminView>
    )
}

export default Records