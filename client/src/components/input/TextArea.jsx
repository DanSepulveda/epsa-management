import { useEffect } from 'react'
import { useField, Field, useFormikContext } from 'formik'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import InputError from './InputError'
import InputLabel from './InputLabel'

function TextArea({ label, activities, dependent, tag = '', ...props }) {
  const { theme } = useSelector(userState)
  const { input, common } = theme
  const [field, meta] = useField(props)
  const { values, setFieldValue } = useFormikContext()

  useEffect(() => {
    if (values.activity !== '' && dependent && tag === 'new') {
      // prettier-ignore
      const value = activities.find((activity) => activity.name.includes(values.activity))?.template || ''
      setFieldValue(props.name, value)
    }
    //  eslint-disable-next-line
  }, [values.activity])

  return (
    <div className="w-full mb-10 flex flex-col">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <Field
        as="textarea"
        rows={4}
        name="template"
        className={`py-2 px-3 border ${input.text} ${common.transition}`}
        {...field}
        {...props}
      />
      <InputError meta={meta} />
    </div>
  )
}

export default TextArea
