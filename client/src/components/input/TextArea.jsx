import { useField, Field } from 'formik'
import InputLabel from './InputLabel'

const TextArea = ({ label, ...props }) => {
    const [field] = useField(props)

    return (
        <div className='w-full mb-10 flex flex-col'>
            {label && <InputLabel id={props.id}>{label}</InputLabel>}
            <Field
                as='textarea'
                rows={4}
                name='template'
                {...field}
                {...props}
                className='py-2 px-3 border border-neutral-300 hover:border-neutral-500 focus:outline-pink-500' />
        </div>
    )
}

export default TextArea