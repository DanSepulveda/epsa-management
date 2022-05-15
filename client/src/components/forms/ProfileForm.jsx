import { Formik, Form } from 'formik'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { userState } from '../../redux/userSlice'
import SubmitButton from '../buttons/SubmitButton'
import InputText from '../input/InputText'
import { useDispatch } from 'react-redux'
import { editUser } from '../../redux/userSlice'
import { successMessage, errorMessage } from '../../utils/messages'

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
            const response = await dispatch(editUser({ values, token }))
            if (response.payload.success) successMessage('Perfil actualizado')
            else throw new Error('Ha ocurrido un error. Intente más tarde')
        } catch (error) {
            errorMessage(error.message)
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