import { useField } from 'formik'
import InputError from '../atoms/InputError'
import InputLabel from '../atoms/InputLabel'

const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div>
            {label && <InputLabel id={id}>{label}</InputLabel>}
            <input type={props.type || 'text'} {...field} {...props} />
            <InputError meta={meta} />
        </div>
    )
}

export default InputText