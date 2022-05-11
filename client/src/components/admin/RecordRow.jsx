import { BiEdit, BiTrash } from 'react-icons/bi'
import useFormatDate from '../../hooks/useFormatDate'
import Box from '../layout/Box'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { deleteRecord } from '../../redux/recordSlice'
import { successMessage, errorMessage } from '../../utils/messages'

const RecordRow = ({ record, setTag, setId, setOpen }) => {
    const date = useFormatDate(record.date)
    const dispatch = useDispatch()

    const deleteAct = async () => {
        try {
            const response = await dispatch(deleteRecord(record._id))
            if (response.payload.success) successMessage('Registro eliminado')
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
            <div className='py-5 grid grid-cols-12'>
                <div className='col-start-1 flex flex-col gap-5'>
                    <BiEdit
                        className='text-3xl fill-blue-400 hover:fill-blue-500 transition-all duration-300 cursor-pointer'
                        onClick={() => {
                            setTag('edit')
                            setId(record._id)
                            setOpen(true)
                        }}
                    />
                    <BiTrash
                        className='text-3xl fill-red-400 hover:fill-red-500 transition-all duration-300 cursor-pointer'
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