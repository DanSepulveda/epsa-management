import ProfileForm from '../components/forms/ProfileForm'
import AdminView from '../components/layout/AdminView'
import Box from '../components/layout/Box'

const Profile = () => {
    return (
        <AdminView>
            <section className='flex flex-col gap-5 items-center'>
                <Box>
                    <div className='py-5 px-3'>
                        <h2 className='text-center mb-4 text-2xl font-bold text-pink-600'>Editar perfil</h2>
                        <ProfileForm />
                    </div>
                </Box>
            </section>
        </AdminView>
    )
}

export default Profile