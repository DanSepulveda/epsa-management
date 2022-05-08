import { Toaster } from 'react-hot-toast'

const Main = ({ children }) => {
    return (
        <main className='bg-pink-100 min-h-screen min-w-screen'>
            <div><Toaster /></div>
            {children}
        </main>
    )
}

export default Main