import { useSelector } from 'react-redux'
import { userState } from '../../redux/userSlice'

function SubmitButton({ children, loading }) {
  const { theme } = useSelector(userState)
  const { buttons, common } = theme

  return (
    <button
      type="submit"
      className={`w-full py-3 font-medium text-center ${buttons.submitBtn} ${common.transition}`}
      disabled={loading}
    >
      {children}
    </button>
  )
}

export default SubmitButton
