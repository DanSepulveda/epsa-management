import themes from "../../app/themes"

const InputError = ({ meta }) => {
    const { touched, error } = meta
    const { input } = themes.default

    return (
        <div style={{ 'minHeight': '25px' }}>
            <span className={`text-sm ${input.error}`}>{touched && error ? error : null}</span>
        </div>
    )
}

export default InputError