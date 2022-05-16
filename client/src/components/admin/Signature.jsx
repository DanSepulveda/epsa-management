import { useState } from 'react'
import { storage } from '../../firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { userState, editUser } from '../../redux/userSlice'
import getExtension from '../../utils/getExtension'
import { loadingError, loadingMessage, loadingSuccess } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMessage'
import IconButton from '../buttons/IconButton'
import themes from '../../app/themes'

const Signature = () => {
    const { text } = themes.default
    const state = useSelector(userState)
    const { uid, token, signature } = state
    const [path, setPath] = useState(signature)
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
            if (!file) throw new Error('empty-file')
            setLoading(true)
            const toastId = loadingMessage('Actualizando firma')
            const extension = getExtension(file.name)
            const imageRef = ref(storage, `users/${uid}/sign.${extension}`)
            await uploadBytes(imageRef, file)
            const url = await getDownloadURL(imageRef)
            const values = { signature: url }
            const response = await dispatch(editUser({ values, token }))
            setLoading(false)
            if (response.payload.success) loadingSuccess('Actualizada', toastId)
            else throw new Error(response.payload.response)
        } catch ({ message }) {
            loadingError(getErrorMsg(message))
        }
    }

    return (
        <div className='flex flex-col gap-10 items-center mt-4'>
            {
                path
                    ? <img src={path} alt='Signature' className='h-28' />
                    : <div className='h-28 flex items-center justify-center'>
                        <p className={`text-xl font-medium ${text.sign}`}>No ha subido ninguna imagen</p>
                    </div>
            }

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