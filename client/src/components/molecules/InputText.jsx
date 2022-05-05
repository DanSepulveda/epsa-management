import { useField } from 'formik'
import InputError from '../atoms/InputError'
import InputLabel from '../atoms/InputLabel'

const InputText = ({ label, ...props }) => {
    const [field, meta] = useField(props)

    return (
        <div className='w-full mb-3 '>
            {label && <InputLabel id={props.id}>{label}</InputLabel>}
            <input
                type={props.type || 'text'}
                {...field}
                {...props}
                className='w-full duration-300 py-2 px-3 border border-neutral-300 hover:border-neutral-500 focus:border-red-600'
                autoComplete='off'
            />
            <InputError meta={meta} />
        </div>
    )
}

export default InputText