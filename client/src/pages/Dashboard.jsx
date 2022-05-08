import AdminView from '../components/layout/AdminView'
import ResumeView from '../components/admin/ResumeView'
import useTitle from '../hooks/useTitle'

const Dashboard = () => {
    useTitle('Inicio')

    return (
        <AdminView>
            <ResumeView />
        </AdminView>
    )
}

export default Dashboard