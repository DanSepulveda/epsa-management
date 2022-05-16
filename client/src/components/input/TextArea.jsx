import { useEffect } from 'react'
import { useField, Field, useFormikContext } from 'formik'
import InputError from './InputError'
import InputLabel from './InputLabel'
import themes from '../../app/themes'

const TextArea = ({ label, activities, dependent, ...props }) => {
    const { input, common } = themes.default
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
                className={`py-2 px-3 border ${input.text} ${common.transition}`}
            />
            <InputError meta={meta} />
        </div>
    )
}

export default TextArea