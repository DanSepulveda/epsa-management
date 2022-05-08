import AdminView from '../components/layout/AdminView'
import ReportsView from '../components/admin/ReportsView'
import useTitle from '../hooks/useTitle'

const Reports = () => {
    useTitle('Reportes')

    return (
        <AdminView>
            <ReportsView />
        </AdminView>
    )
}

export default Reports