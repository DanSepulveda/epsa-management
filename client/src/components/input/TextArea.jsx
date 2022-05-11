import { useEffect } from 'react'
import { useField, Field, useFormikContext } from 'formik'
import InputError from './InputError'
import InputLabel from './InputLabel'

const TextArea = ({ label, activities, dependent, ...props }) => {
    const [field, meta] = useField(props)
    const { values, setFieldValue } = useFormikContext()

    useEffect(() => {
        if (values.activity !== '' && dependent) {
            const value = activities.find(activity => activity.name.includes(values.activity))?.template || ''
            setFieldValue(props.name, value)
        }
        //eslint-disable-next-line
    }, [values.activity])

    return (
        <div className='w-full mb-10 flex flex-col'>
            {label && <InputLabel id={props.id}>{label}</InputLabel>}
            <Field
                as='textarea'
                rows={4}
                name='template'
                {...field}
                {...props}
                className='py-2 px-3 border border-neutral-300 hover:border-neutral-500 focus:outline-pink-500'
            />
            <InputError meta={meta} />
        </div>
    )
}

export default TextArea