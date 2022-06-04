import ReactDOM from 'react-dom'
import { RiCloseCircleFill } from 'react-icons/ri'
import Box from './Box'

function OverForm({ children, setOpen }) {
  return ReactDOM.createPortal(
    <div className="min-h-full min-w-full bg-neutral-900/80 absolute top-0 left-0 z-50 flex items-center justify-center px-2">
      <Box>
        <RiCloseCircleFill
          className="fill-pink-500 text-4xl ml-auto mb-3 hover:fill-pink-500/80 cursor-pointer transition-all duration-300"
          onClick={() => setOpen(false)}
        />
        {children}
      </Box>
    </div>,
    document.getElementById('overform'),
  )
}

export default OverForm
