import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import useDate from '../../hooks/useDate'
import { createRecord, editRecord, recordState } from '../../redux/recordSlice'
import { userState } from '../../redux/userSlice'
import { activityState } from '../../redux/activitySlice'
import { successMessage, errorMessage } from '../../utils/messages'
import getErrorMsg from '../../app/getErrorMsg'
import InputText from '../input/InputText'
import TextArea from '../input/TextArea'
import SubmitButton from '../buttons/SubmitButton'

function RecordForm({ tag, data }) {
  const dispatch = useDispatch()
  const date = useDate()
  const { activities } = useSelector(activityState)
  const { token } = useSelector(userState)
  const { loading } = useSelector(recordState)

  const create = async (values, resetForm) => {
    try {
      const response = await dispatch(createRecord({ values, token }))
      if (response.payload.success) {
        successMessage('Registro creado')
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
      const response = await dispatch(editRecord({ values, id, token }))
      if (response.payload.success) successMessage('Registro editado')
      else throw new Error(response.payload.response)
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
    ? { date, activity: '', description: '' }
    : {
      date: data.date.split('T')[0],
      activity: data.activity,
      description: data.description,
    }

  const validationSchema = Yup.object({
    date: Yup.date().required('Campo requerido'),
    activity: Yup.string().required('Campo requerido'),
    description: Yup.string().required('Campo requerido'),
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      validationSchema={validationSchema}
    >
      <Form>
        <InputText name="date" id="date" label="Fecha" type="date" />
        <datalist id="activityList">
          {activities.map((activity) => (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <option key={activity._id} value={activity.name} />
          ))}
        </datalist>
        <InputText
          label="Nombre de la actividad"
          name="activity"
          id="activity"
          placeholder="Puede escribir o seleccionar desde la lista"
          list="activityList"
        />
        <TextArea
          label="Descripción de la actividad"
          name="description"
          id="description"
          placeholder="Ej: Se realiza evaluación psicométrica a la estudiante Johannis Barrios de 7° básico. "
          disabled={false}
          activities={activities}
          // eslint-disable-next-line react/jsx-boolean-value
          dependent={true}
          tag={tag}
        />
        <div className="w-24 mx-auto">
          <SubmitButton loading={loading}>{tag === 'new' ? 'Crear' : 'Editar'}</SubmitButton>
        </div>
      </Form>
    </Formik>
  )
}

export default RecordForm
