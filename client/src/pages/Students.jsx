import AdminView from '../components/layout/AdminView'
import useTitle from '../hooks/useTitle'

const Students = () => {
    useTitle('Alumnos')

    return (
        <AdminView>
            <section className='flex flex-col gap-5'>
                Students
            </section>
        </AdminView>
    )
}

export default Students