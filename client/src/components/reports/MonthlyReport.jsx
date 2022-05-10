import { useState } from 'react'
import Box from '../layout/Box'
import IconButton from '../buttons/IconButton'

const MonthlyReport = () => {
    const [month, setMonth] = useState()

    const inputHandler = (e) => {
        e.preventDefault()
        setMonth(e.target.value)
    }

    return (
        <Box>
            <div className='lg:flex items-center justify-between'>
                <h2 className='text-lg font-medium text-center mb-3 lg:mb-0'>Informe mensual</h2>
                <div className='flex flex-col items-center gap-3 md:flex-row justify-between'>
                    <input
                        type='month'
                        onChange={(e) => inputHandler(e)}
                        className='py-1 px-2 border border-pink-700'
                    />
                    <div className='flex gap-4'>
                        <IconButton icon='word' onClick={() => alert(month)}>Generar</IconButton>
                        <IconButton icon='download'>Descargar</IconButton>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default MonthlyReport