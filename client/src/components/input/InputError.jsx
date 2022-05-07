const InputError = ({ meta }) => {
    const { touched, error } = meta

    return (
        <div style={{ 'minHeight': '25px' }}>
            <span className='text-sm text-red-500'>{touched && error ? error : null}</span>
        </div>
    )
}

export default InputError