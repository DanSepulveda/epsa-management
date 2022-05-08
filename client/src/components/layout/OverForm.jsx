import Box from './Box'

const OverForm = ({ children }) => {
    return (
        <div className='min-h-full min-w-full bg-neutral-900/80 absolute top-0 left-0 z-50 flex items-center justify-center px-2'>
            <Box>
                {children}
            </Box>
        </div>
    )
}

export default OverForm