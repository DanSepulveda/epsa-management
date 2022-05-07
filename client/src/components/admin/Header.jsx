import React from 'react'
import { useLocation } from 'react-router-dom'

const Header = () => {
    const path = useLocation().pathname

    console.log(path)

    const title = {
        '/': 'Resumen',
        '/records': 'Registros',
        '/reports': 'Reportes'
    }

    return (
        <div className='bg-white shadow-md px-7 py-2'>
            <h1 className='text-lg font-bold text-rose-700'>{title[path]}</h1>
        </div>
    )
}

export default Header