import React, { useState } from 'react'
import { errorMessage } from '../../utils/messages'
import IconButton from '../buttons/IconButton'

const Signature = () => {
    const [path, setPath] = useState('/assets/sad-minnie.png')
    const [file, setFile] = useState()

    const inputHandler = (e) => {
        setFile(e.target.files[0])
        const newFile = URL.createObjectURL(e.target.files[0])
        setPath(newFile)
    }

    const submit = () => {
        if (!file) {
            errorMessage('Debe seleccionar un archivo')
        } else {
            const fd = new FormData()
            fd.append('signature', file)
            console.log(fd)
        }
    }

    return (
        <div className='flex flex-col gap-7 items-center'>
            <img src={path} alt='Signature' className='h-28' />
            <input
                type='file'
                name='signature'
                id='signature'
                onChange={inputHandler}
            />
            <IconButton onClick={submit} icon='image'>Subir imagen</IconButton>
        </div>
    )
}

export default Signature