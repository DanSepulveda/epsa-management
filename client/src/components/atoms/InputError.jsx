const InputError = ({ meta }) => {
    const { touched, error } = meta

    return (
        <div><span>{touched && error ? `* ${error}` : null}</span></div>
    )
}

export default InputError