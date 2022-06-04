import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'

function InputError({ meta }) {
  const { theme } = useSelector(userState)
  const { touched, error } = meta

  return (
    <div style={{ minHeight: '25px' }}>
      <span className={`text-xs pl-1 ${theme.input.error}`}>{touched && error ? error : null}</span>
    </div>
  )
}

export default InputError
