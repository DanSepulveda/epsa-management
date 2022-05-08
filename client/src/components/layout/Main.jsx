import { Toaster } from 'react-hot-toast'

const Main = ({ children }) => {
    return (
        <main className='bg-pink-100 h-screen w-screen overflow-hidden'>
            <div><Toaster /></div>
            {children}
        </main>
    )
}

export default Main