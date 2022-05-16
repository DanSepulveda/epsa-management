import useTitle from '../hooks/useTitle'
import AdminView from '../components/layout/AdminView'

const Dashboard = () => {
    useTitle('Inicio')

    return (
        <AdminView>
            <div className='flex'>
                Próximamente
            </div>
        </AdminView>
    )
}

export default Dashboard