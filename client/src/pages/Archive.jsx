import useTitle from '../hooks/useTitle'
import AdminView from '../components/layout/AdminView'
import UnderConstruction from '../components/information/UnderConstruction'

function Archive() {
  useTitle('Archivos subidos')

  return (
    <AdminView>
      <section className="flex justify-center items-center h-full">
        <UnderConstruction />
      </section>
    </AdminView>
  )
}

export default Archive
