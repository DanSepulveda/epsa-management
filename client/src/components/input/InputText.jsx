import { useField } from 'formik'
import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'
import InputError from './InputError'
import InputLabel from './InputLabel'

function InputText({ label, ...props }) {
  const [field, meta] = useField(props)
  const { theme } = useSelector(userState)
  const { input, common } = theme

  return (
    <div className="w-full mb-3">
      {label && <InputLabel id={props.id}>{label}</InputLabel>}
      <input
        type={props.type || 'text'}
        className={`w-full py-2 px-3 border ${input.text} ${common.transition}`}
        autoComplete="off"
        {...field}
        {...props}
      />
      <InputError meta={meta} />
    </div>
  )
}

export default InputText
