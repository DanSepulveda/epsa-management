import React, { useState } from 'react'
import { errorMessage, successMessage } from '../../utils/messages'
import IconButton from '../buttons/IconButton'
import { storage } from '../../firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import getExtension from '../../utils/getExtension'
import { userState, editUser } from '../../redux/userSlice'

const Signature = () => {
    const state = useSelector(userState)
    const { uid, token, signature } = state
    const [path, setPath] = useState(signature || '/assets/sad-minnie.png')
    const [loading, setLoading] = useState(false)
    const [file, setFile] = useState()
    const dispatch = useDispatch()


    const inputHandler = (e) => {
        setFile(e.target.files[0])
        const newFile = URL.createObjectURL(e.target.files[0])
        setPath(newFile)
    }

    const submit = async () => {
        try {
            if (!file) {
                throw new Error('Debe seleccionar un archivo')
            } else {
                setLoading(true)
                const extension = getExtension(file.name)
                const imageRef = ref(storage, `users/${uid}/sign.${extension}`)
                await uploadBytes(imageRef, file)
                const url = await getDownloadURL(imageRef)
                const values = { signature: url }
                const response = await dispatch(editUser({ values, token }))
                if (response.payload.success) successMessage('Firma actualizada')
                setLoading(false)
            }
        } catch (error) {
            errorMessage(error.message)
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
            <IconButton onClick={submit} icon='image' loading={loading}>
                Subir imagen
            </IconButton>
        </div>
    )
}

export default Signature