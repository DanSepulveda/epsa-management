import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { deleteActivity } from '../../redux/activitySlice'
import { successMessage, errorMessage } from '../../utils/messages'
import Swal from 'sweetalert2'
import TemplateForm from '../forms/TemplateForm'
import Box from '../layout/Box'

const ActRow = ({ activity }) => {
    const [editable, setEditable] = useState(false)
    const dispatch = useDispatch()

    const deleteAct = async () => {
        try {
            const response = await dispatch(deleteActivity(activity._id))
            if (response.payload.success) successMessage('Actividad eliminada')
            else throw new Error('Ha ocurrido un error. Intente más tarde')
        } catch (error) {
            errorMessage(error.message)
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
                    className='text-3xl fill-blue-400 hover:fill-blue-500 transition-all duration-300 cursor-pointer'
                    onClick={() => setEditable(!editable)}
                />
                <BiTrash
                    className='text-3xl fill-red-400 hover:fill-red-500 transition-all duration-300 cursor-pointer'
                    onClick={confirmation}
                />
            </div>
            <TemplateForm tag='edit' data={activity} editable={editable} setEditable={setEditable} />
        </Box>
    )
}

export default ActRow