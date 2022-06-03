import useTitle from '../hooks/useTitle'
import AdminView from '../components/layout/AdminView'
import MonthlyReport from '../components/reports/MonthlyReport'

const Reports = () => {
    useTitle('Informes')

    return (
        <AdminView>
            <section className='flex flex-col gap-5'>
                <MonthlyReport />
            </section>
        </AdminView>
    )
}

export default Reports