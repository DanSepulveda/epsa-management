import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import { deleteActivity } from '../../redux/activitySlice'
import { successMessage, errorMessage } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import Swal from 'sweetalert2'
import { BiEdit, BiTrash } from 'react-icons/bi'
import TemplateForm from '../forms/TemplateForm'
import Box from '../layout/Box'

const ActRow = ({ activity }) => {
    const { token, theme } = useSelector(userState)
    const { buttons, common } = theme
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()

    const deleteAct = async () => {
        try {
            const response = await dispatch(deleteActivity({ id: activity._id, token }))
            if (response.payload.success) successMessage('Actividad eliminada')
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
            <div className='flex justify-center gap-4 mb-4'>
                <BiEdit
                    className={`text-3xl cursor-pointer ${buttons.edit} ${common.transition}`}
                    onClick={() => setEditable(!editable)}
                />
                <BiTrash
                    className={`text-3xl cursor-pointer ${buttons.delete} ${common.transition}`}
                    onClick={confirmation}
                />
            </div>
            <TemplateForm tag='edit' data={activity} editable={editable} setEditable={setEditable} />
        </Box>
    )
}

export default ActRow