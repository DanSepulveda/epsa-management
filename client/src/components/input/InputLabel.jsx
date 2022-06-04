import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'

function InputLabel({ id, children }) {
  const { theme } = useSelector(userState)

  return (
    <label htmlFor={id} className={`mb-1 text-lg ${theme.input.label}`}>
      {children}
    </label>
  )
}

export default InputLabel
