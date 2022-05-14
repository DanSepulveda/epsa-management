import axios from 'axios'
import { useState } from 'react'
import { errorMessage, successMessage } from '../../utils/messages'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import Box from '../layout/Box'
import IconButton from '../buttons/IconButton'
import { storage } from '../../firebase.config'
import { ref, getDownloadURL } from 'firebase/storage'

const MonthlyReport = () => {
    const [month, setMonth] = useState('')
    const [loading, setLoading] = useState(false)
    const { token, signature } = useSelector(userState)

    const HOST = 'http://localhost:4000/api'

    const inputHandler = (e) => {
        e.preventDefault()
        setMonth(e.target.value)
    }

    const makeRequest = async () => {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest()
            xhr.open('GET', signature)
            xhr.responseType = 'blob'
            xhr.onload = function () {
                var reader = new FileReader()
                reader.readAsDataURL(xhr.response)
                reader.onload = function (e) {
                    const data = e.target.result.replace(/^data:image\/\w+;base64,/, '')
                    resolve(data)
                }
            }
            xhr.send()
        });
    }

    const createReport = async () => {
        setLoading(true)
        const data = await makeRequest()
        if (month === '') {
            errorMessage('Debe seleccionar una fecha')
        } else {
            successMessage('Generando informe')
            const response = await axios.post(`${HOST}/monthly-report`, { month, data }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response.data.success) {
                await getDownloadURL(ref(storage, response.data.response)).then((url) => {
                    window.open(url, '_blank')
                })
            } else {
                errorMessage('Ha ocurrido un error. Intente más tarde')
            }
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
                        onChange={(e) => inputHandler(e)}
                        className='py-1 px-2 border border-pink-700'
                    />
                    <div className=''>
                        <IconButton icon='word' onClick={createReport} loading={loading}>
                            Generar
                        </IconButton>
                    </div>
                </div>
            </div>
        </Box>
    )
}

export default MonthlyReport