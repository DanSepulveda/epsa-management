import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import { storage } from '../../firebase.config'
import { ref, getDownloadURL } from 'firebase/storage'
import { loadingError, loadingMessage, loadingSuccess } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import Box from '../layout/Box'
import IconButton from '../buttons/IconButton'
import themes from '../../app/themes'
import { HOST } from '../../app/app.config'

const MonthlyReport = () => {
    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)
    const { token } = useSelector(userState)
    const { common } = themes.default

    const downloadFile = async (documentRef) => {
        await getDownloadURL(ref(storage, documentRef)).then((url) => {
            const link = document.createElement('a')
            link.href = url
            link.download = 'Informe-mensual.docx'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        })
    }

    const createReport = async () => {
        try {
            setLoading(true)
            if (date === '') throw new Error('empty-date')
            var toastId = loadingMessage('Generando informe')

            const response = await axios.post(`${HOST}/monthly-report`, { date }, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if (response.data.success) await downloadFile(response.data.response)
            else throw new Error(response.data.response)

            loadingSuccess('Descargando...', toastId)
        } catch ({ message }) {
            loadingError(getErrorMsg(message), toastId)
        }
        setLoading(false)
    }

    return (
        <Box>
            <div className='lg:flex items-center justify-between'>
                <h2 className='text-lg font-medium text-center mb-3 lg:mb-0'>Informe mensual</h2>
                <div className='flex flex-col items-center gap-3 md:flex-row justify-between'>
                    <input
                        type='month'
                        onChange={(e) => setDate(e.target.value)}
                        className={`py-1 px-2 border ${common.inputBorder}`}
                    />
                    <IconButton icon='word' onClick={createReport} loading={loading}>
                        Generar
                    </IconButton>
                </div>
            </div>
        </Box>
    )
}

export default MonthlyReport