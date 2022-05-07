import React from 'react'
import InputSelect from '../input/InputSelect'
import InputText from '../input/InputText'
import { Field } from 'formik'

const DailyRecord = ({ input }) => {
    return (
        <div className='shadow-md rounded p-3 m-3 bg-white'>
            <InputSelect />
            <InputText name={`description${input}`} id={`description${input}`} placeholder='Descripción' />
        </div>
    )
}

export default DailyRecord