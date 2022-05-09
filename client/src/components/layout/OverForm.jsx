import Box from './Box'
import { RiCloseCircleFill } from 'react-icons/ri'

const OverForm = ({ children, setOpen }) => {
    return (
        <div className='min-h-full min-w-full bg-neutral-900/80 absolute top-0 left-0 z-50 flex items-center justify-center px-2'>
            <Box>
                <RiCloseCircleFill
                    className='fill-pink-700 text-4xl ml-auto mb-3 hover:fill-pink-600 cursor-pointer'
                    onClick={() => setOpen(false)}
                />
                {children}
            </Box>
        </div>
    )
}

export default OverForm