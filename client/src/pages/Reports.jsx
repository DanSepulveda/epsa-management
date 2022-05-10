import AdminView from '../components/layout/AdminView'
import useTitle from '../hooks/useTitle'
import MonthlyReport from '../components/reports/MonthlyReport'

const Reports = () => {
    useTitle('Reportes')

    return (
        <AdminView>
            <section className='flex flex-col gap-5'>
                <MonthlyReport />
            </section>
        </AdminView>
    )
}

export default Reports