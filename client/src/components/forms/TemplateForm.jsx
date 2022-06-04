import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { createActivity, editActivity, activityState } from '../../redux/activitySlice'
import { userState } from '../../redux/userSlice'
import { successMessage, errorMessage } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import InputText from '../input/InputText'
import TextArea from '../input/TextArea'
import SubmitButton from '../buttons/SubmitButton'

function TemplateForm({ tag, data, editable, setEditable }) {
  const dispatch = useDispatch()
  const { loading } = useSelector(activityState)
  const { token } = useSelector(userState)

  const create = async (values, resetForm) => {
    try {
      const response = await dispatch(createActivity({ values, token }))
      if (response.payload.success) {
        successMessage('Actividad creada')
        resetForm()
      } else {
        throw new Error(response.payload.response)
      }
    } catch ({ message }) {
      errorMessage(getErrorMsg(message))
    }
  }

  const edit = async (values) => {
    const id = data._id
    try {
      const response = await dispatch(editActivity({ values, id, token }))
      if (response.payload.success) {
        successMessage('Actividad editada')
        setEditable(false)
      } else {
        throw new Error(response.payload.response)
      }
    } catch ({ message }) {
      errorMessage(getErrorMsg(message))
    }
  }

  const handleSubmit = (values, resetForm) => {
    if (tag === 'new') {
      create(values, resetForm)
    } else {
      edit(values)
    }
  }

  // prettier-ignore
  const initialValues = tag === 'new'
    ? { name: '', template: '' }
    : { name: data.name, template: data.template }

  const validationSchema = Yup.object({
    name: Yup.string().required('Campo requerido'),
    template: Yup.string().required('Campo requerido'),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      validationSchema={validationSchema}
    >
      <Form>
        <InputText
          label="Nombre de la actividad"
          name="name"
          id="name"
          placeholder="Ej: Atención de apoderado"
          disabled={!!(tag === 'edit' && !editable)}
        />
        <TextArea
          label="Plantilla"
          name="template"
          id="template"
          placeholder="Se realiza atención de apoderado de la estudiante **X** de 6° básico."
          disabled={!!(tag === 'edit' && !editable)}
          dependent={false}
        />
        {tag === 'new' || editable ? (
          <div className="w-24 mx-auto">
            <SubmitButton loading={loading}>{tag === 'new' ? 'Crear' : 'Editar'}</SubmitButton>
          </div>
        ) : null}
      </Form>
    </Formik>
  )
}

export default TemplateForm
