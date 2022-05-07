import React from 'react'
import DailyRecord from '../forms/NewRecordForm'

const RecordsView = () => {
    return (
        <div className='flex-1'>
            <DailyRecord />
            <div className='bg-white shadow-md rounded flex p-2'>
                <input
                    className='border border-pink-600'
                    placeholder='Buscar registro...'
                />
            </div>
        </div>
    )
}

export default RecordsView