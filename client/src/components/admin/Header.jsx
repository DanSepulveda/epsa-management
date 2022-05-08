import { useLocation } from 'react-router-dom'

const Header = () => {
    const path = useLocation().pathname

    const title = {
        '/': 'Resumen',
        '/records': 'Registros',
        '/reports': 'Informes',
        '/files': 'Archivos subidos'
    }

    return (
        <div className='bg-white shadow-md px-3 sm:px-7 py-2 flex justify-between items-center max-w-full'>
            <h1 className='text-lg font-bold text-rose-700'>{title[path]}</h1>
            <div className='flex gap-3 items-center'>
                <p>Bienvenid@</p>
                <div className='bg-pink-700 rounded-full' style={{ 'width': '40px', 'height': '40px' }}></div>
            </div>
        </div>
    )
}

export default Header