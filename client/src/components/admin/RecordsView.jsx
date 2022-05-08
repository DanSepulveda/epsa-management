import React, { useState } from 'react'
import IconButton from '../buttons/IconButton'
import NewRecordForm from '../forms/NewRecordForm'
import Tab from '../navigation/Tab'
import Tabs from '../navigation/Tabs'

const RecordsView = () => {
    const [open, setOpen] = useState(false)
    // <div className='bg-white shadow-md rounded flex p-2'>
    //     <input
    //         className='border border-pink-600'
    //         placeholder='Buscar registro...'
    //     />
    // </div>
    return (
        <div className='max-w-full flex-col'>
            <Tabs>
                <Tab>Lista</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
                <Tab>Actividades</Tab>
            </Tabs>
            <div className='flex gap-4 items-center justify-center mb-5'>
                <h2 className='text-2xl'>Mayo 2022</h2>
                <IconButton icon='plus' onClick={() => setOpen(true)}>Nuevo</IconButton>
            </div>
            {open && <NewRecordForm />}
        </div>
    )
}

export default RecordsView