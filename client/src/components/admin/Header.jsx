import { useLocation } from 'react-router-dom'
import { HiMenu } from 'react-icons/hi'

const Header = () => {
    const path = useLocation().pathname

    console.log(path)

    const title = {
        '/': 'Resumen',
        '/records': 'Registros',
        '/reports': 'Informes'
    }

    return (
        <div className='bg-white shadow-md px-7 py-2 flex justify-between items-center'>
            <div className='flex gap-3'>
                <HiMenu className='text-3xl fill-pink-700 bg md:hidden' />
                <h1 className='text-lg font-bold text-rose-700'>{title[path]}</h1>
            </div>
            <div className='flex gap-3 items-center'>
                <p>Bienvenid@</p>
                <div className='bg-pink-700 rounded-full' style={{ 'width': '40px', 'height': '40px' }}></div>
            </div>
        </div>
    )
}

export default Header