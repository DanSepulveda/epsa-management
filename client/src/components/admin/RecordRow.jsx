import React from 'react'
import useFormatDate from '../../hooks/useFormatDate'
import Box from '../layout/Box'

const RecordRow = ({ record }) => {
    const date = useFormatDate(record.date)

    return (
        <Box>
            <div className='py-5 grid grid-cols-12'>
                <div className='col-start-1 col-span-2'>
                    <h4 className='font-medium text-md'>Fecha</h4>
                    <p className=''>{date}</p>
                </div>
                <div className='col-start-3 col-span-5'>
                    <h4 className='font-medium text-md'>Actividad</h4>
                    <p>{record.activity}</p>
                </div>
                <div className='col-start-8 col-span-5'>
                    <h4 className='font-medium text-md'>Descripción</h4>
                    <p>{record.description}</p>
                </div>
            </div>
        </Box>
    )
}

export default RecordRow