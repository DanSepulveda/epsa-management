import Box from './Box'

const ReportRow = ({ title, children }) => {
    return (
        <Box>
            <div className='lg:flex items-center justify-between'>
                <h2 className='text-lg font-medium text-center mb-3 lg:mb-0'>
                    {title}
                </h2>
                <div className='flex flex-col items-center gap-3 md:flex-row justify-between'>
                    {children}
                </div>
            </div>
        </Box>
    )
}

export default ReportRow