import ProfileForm from '../components/forms/ProfileForm'
import AdminView from '../components/layout/AdminView'
import Box from '../components/layout/Box'
import Tabs from '../components/navigation/Tabs'
import Tab from '../components/navigation/Tab'
import useTitle from '../hooks/useTitle'
import { useState } from 'react'
import Signature from '../components/admin/Signature'

const Profile = () => {
    useTitle('Perfil de usuario')
    const [tab, setTab] = useState(1)

    return (
        <AdminView>
            <section className='flex flex-col gap-5 items-center'>
                <Tabs>
                    <Tab icon='basics' tab={1} actualTab={tab} setTab={setTab}>Datos básicos</Tab>
                    <Tab icon='signature' tab={2} actualTab={tab} setTab={setTab}>Firma</Tab>
                </Tabs>
                {
                    tab === 1
                        ? <Box>
                            <div className='py-5 px-3'>
                                <h2 className='text-center mb-4 text-2xl font-bold text-pink-600'>Editar perfil</h2>
                                <ProfileForm />
                            </div>
                        </Box>
                        : <Signature />
                }

            </section>
        </AdminView>
    )
}

export default Profile