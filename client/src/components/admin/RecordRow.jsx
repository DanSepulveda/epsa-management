import useFormatDate from '../../hooks/useFormatDate'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import { deleteRecord } from '../../redux/recordSlice'
import { successMessage, errorMessage } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import Swal from 'sweetalert2'
import { BiEdit, BiTrash } from 'react-icons/bi'
import Box from '../layout/Box'
import themes from '../../app/themes'

const RecordRow = ({ record, setTag, setId, setOpen }) => {
    const { buttons, common } = themes.default
    const date = useFormatDate(record.date)
    const dispatch = useDispatch()
    const token = useSelector(userState).token

    const deleteAct = async () => {
        try {
            const response = await dispatch(deleteRecord({ id: record._id, token }))
            if (response.payload.success) successMessage('Registro eliminado')
            else throw new Error(response.payload.response)
        } catch ({ message }) {
            errorMessage(getErrorMsg(message))
        }
    }

    const confirmation = () => {
        Swal.fire({
            text: "¿Estás seguro/a?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#e11d48',
            cancelButtonColor: '#16a34a'
        }).then((result) => {
            if (result.isConfirmed) deleteAct()
        })
    }

    return (
        <Box>
            <div className='py-5 grid grid-cols-12'>
                <div className='col-start-1 flex flex-col gap-5'>
                    <BiEdit
                        className={`text-3xl cursor-pointer ${buttons.edit} ${common.transition}`}
                        onClick={() => {
                            setTag('edit')
                            setId(record._id)
                            setOpen(true)
                        }}
                    />
                    <BiTrash
                        className={`text-3xl cursor-pointer ${buttons.delete} ${common.transition}`}
                        onClick={confirmation}
                    />
                </div>
                <div className='col-start-2 col-span-2'>
                    <h4 className='font-medium text-md'>Fecha</h4>
                    <p className=''>{date}</p>
                </div>
                <div className='col-start-4 col-span-4'>
                    <h4 className='font-medium text-md'>Actividad</h4>
                    <p>{record.activity}</p>
                </div>
                <div className='col-start-8 col-span-5'>
                    <h4 className='font-medium text-md'>Descripción</h4>
                    <p>{record.description}</p>
                </div>
            </div>
        </Box>
    )
}

export default RecordRow