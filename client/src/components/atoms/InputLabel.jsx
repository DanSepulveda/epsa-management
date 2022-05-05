const InputLabel = ({ id, children }) => {
    return (
        <label htmlFor={id} className='mb-1 text-lg'>
            {children}
        </label>
    )
}

export default InputLabel