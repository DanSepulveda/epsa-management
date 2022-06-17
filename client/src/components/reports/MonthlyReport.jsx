/* eslint-disable no-var */
/* eslint-disable vars-on-top */
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ref, getDownloadURL } from 'firebase/storage'
import { userState } from '../../redux/userSlice'
import { storage } from '../../firebase.config'
import { loadingError, loadingMessage, loadingSuccess } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import IconButton from '../buttons/IconButton'
import ReportRow from '../layout/ReportRow'

function MonthlyReport() {
  const [date, setDate] = useState('')
  const [loading, setLoading] = useState(false)
  const { token, theme } = useSelector(userState)
  const { common } = theme

  const HOST = 'http://localhost:4000/api'
  // const HOST = 'https://us-central1-panel-epsa.cloudfunctions.net/app'

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

      const response = await axios.post(
        `${HOST}/monthly-report`,
        { date },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      if (response.data.success) await downloadFile(response.data.response)
      else throw new Error(response.data.response)

      loadingSuccess('Descargando...', toastId)
    } catch ({ message }) {
      loadingError(getErrorMsg(message), toastId)
    }
    setLoading(false)
  }

  return (
    <ReportRow title="Informe mensual">
      <input
        type="month"
        onChange={(e) => setDate(e.target.value)}
        className={`py-1 px-2 border ${common.inputBorder}`}
      />
      <IconButton icon="word" onClick={createReport} loading={loading}>
        Generar
      </IconButton>
    </ReportRow>
  )
}

export default MonthlyReport
