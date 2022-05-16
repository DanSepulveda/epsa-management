import { useField } from 'formik'
import InputError from './InputError'
import InputLabel from './InputLabel'
import themes from '../../app/themes'

const InputText = ({ label, ...props }) => {
    const { input, common } = themes.default
    const [field, meta] = useField(props)

    return (
        <div className='w-full mb-3'>
            {label && <InputLabel id={props.id}>{label}</InputLabel>}
            <input
                type={props.type || 'text'}
                {...field}
                {...props}
                className={`w-full py-2 px-3 border ${input.text} ${common.transition}`}
                autoComplete='off'
            />
            <InputError meta={meta} />
        </div>
    )
}

export default InputText