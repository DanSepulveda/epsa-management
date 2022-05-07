import PanelMenu from "../navigation/PanelMenu"

const AdminView = ({ children }) => {
    return (
        <section className='flex h-screen'>
            <PanelMenu />
            {children}
        </section>
    )
}

export default AdminView