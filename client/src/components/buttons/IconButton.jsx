import { useSelector } from 'react-redux'
import {
  BsFileEarmarkWord,
  BsDownload,
  BsPlusLg,
  BsImage,
} from 'react-icons/bs'
import { userState } from '../../redux/userSlice'

function IconButton({ children, icon, onClick, loading = false }) {
  const { theme } = useSelector(userState)
  const { buttons, common } = theme

  const icons = {
    word: <BsFileEarmarkWord className={buttons.iconFill} />,
    download: <BsDownload className={buttons.iconFill} />,
    plus: <BsPlusLg className={buttons.iconFill} />,
    image: <BsImage className={buttons.iconFill} />,
  }

  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex items-center gap-2 py-1 px-2 rounded ${common.transition} ${buttons.iconBtn}`}
      disabled={loading}
    >
      {icons[icon]}
      {children}
    </button>
  )
}

export default IconButton
