import React from 'react'
import InputSelect from '../input/InputSelect'
import InputText from '../input/InputText'
import { Field, Formik, Form } from 'formik'
import { useState, useEffect } from 'react'

const DailyRecord = ({ input }) => {
    const [inputQty, setInputQty] = useState([1, 2, 3, 4, 5, 6])
    const [initialValues, setInitialValues] = useState({})

    // useEffect(() => {
    //     let values = {}
    //     for (let i = 1; i <= inputQty.length; i++) {
    //         values[`act${i}`] = ''
    //         values[`description${i}`] = ''
    //     }
    //     setInitialValues({ ...initialValues, ...values })
    // }, [])
    // <InputSelect />
    // <InputText name={`description${input}`} id={`description${input}`} placeholder='Descripción' />
    // {inputQty.map(input => <DailyRecord key={input} input={input} />)}

    // console.log(initialValues)
    return (
        <div className='shadow-md rounded p-3 m-3 bg-white'>
            <Formik
                initialValues={{}}
                onSubmit={values => console.log(values)}
            >
                <Form>
                    <input type='date' />

                    <button type='send'>enviar</button>
                </Form>
            </Formik>
        </div>
    )
}

export default DailyRecord