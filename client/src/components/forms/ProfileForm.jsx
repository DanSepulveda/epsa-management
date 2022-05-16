import { useDispatch, useSelector } from 'react-redux'
import { userState, editUser } from '../../redux/userSlice'
import { loadingMessage, loadingSuccess, loadingError } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputText from '../input/InputText'
import SubmitButton from '../buttons/SubmitButton'

const ProfileForm = () => {
    const { fullname, username, position, token, loading } = useSelector(userState)
    const dispatch = useDispatch()

    const initialValues = {
        fullname,
        username,
        position
    }

    const validationSchema = Yup.object({
        fullname: Yup.string().required('Campo requerido'),
        username: Yup.string().required('Campo requerido'),
        position: Yup.string().required('Campo requerido'),
    })

    const updateUser = async (values) => {
        try {
            if (JSON.stringify(initialValues) === JSON.stringify(values)) throw new Error('no-changes')
            var toastId = loadingMessage('Actualizando perfil')
            const response = await dispatch(editUser({ values, token }))
            if (response.payload.success) loadingSuccess('Actualizado', toastId)
            else throw new Error(response.payload.response)
        } catch ({ message }) {
            loadingError(getErrorMsg(message), toastId)
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={(values) => updateUser(values)}
            validationSchema={validationSchema}
        >
            <Form>
                <InputText
                    name='fullname'
                    id='fullname'
                    label='Nombre completo'
                    placeholder='Ej: Juan Pérez Pérez'
                />
                <InputText
                    name='username'
                    id='username'
                    label='Nombre de usuario'
                    placeholder='Ej: juanito'
                />
                <InputText
                    name='position'
                    id='position'
                    label='Función'
                    placeholder='ej: Psicóloga'
                />
                <SubmitButton loading={loading}>
                    Guardar cambios
                </SubmitButton>
            </Form>
        </Formik>
    )
}

export default ProfileForm