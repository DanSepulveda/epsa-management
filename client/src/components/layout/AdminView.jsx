import Header from "../admin/Header"
import PanelMenu from "../navigation/PanelMenu"

const AdminView = ({ children }) => {
    return (
        <section className='flex h-screen'>
            <PanelMenu />
            <section className='flex flex-col flex-1'>
                <Header />
                <div className='px-7 py-5'>
                    {children}
                </div>
            </section>
        </section>
    )
}

export default AdminView