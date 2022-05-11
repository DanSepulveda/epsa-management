import React from 'react'
import useFormatDate from '../../hooks/useFormatDate'
import Box from '../layout/Box'

const RecordRow = ({ record }) => {
    const date = useFormatDate(record.date)

    return (
        <Box>
            <div className='flex gap-8 py-5'>
                <div>
                    <h4 className='font-medium text-md'>Fecha</h4>
                    <p className=''>{date}</p>
                </div>
                <div>
                    <h4 className='font-medium text-md'>Actividad</h4>
                    <p>{record.activity}</p>
                </div>
                <div>
                    <h4 className='font-medium text-md'>Descripción</h4>
                    <p>{record.description}</p>
                </div>
            </div>
        </Box>
    )
}

export default RecordRow