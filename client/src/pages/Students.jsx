import AdminView from '../components/layout/AdminView'
import useTitle from '../hooks/useTitle'
import UnderConstruction from '../components/information/UnderConstruction'

const Students = () => {
    useTitle('Alumnos')

    return (
        <AdminView>
            <section className='flex justify-center items-center h-full'>
                <UnderConstruction />
            </section>
        </AdminView>
    )
}

export default Students