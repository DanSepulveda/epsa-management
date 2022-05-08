import React from 'react'
import InputSelect from '../input/InputSelect'
import InputText from '../input/InputText'
import { Formik, Form } from 'formik'
import { useState, useEffect } from 'react'
import Box from '../layout/Box'

const NewRecordForm = ({ input }) => {
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
        <div className='min-h-full min-w-full bg-gray-900/50 absolute top-0 left-0 z-50 flex items-center justify-center'>
            <Box>
                <Formik
                    initialValues={{}}
                    onSubmit={values => console.log(values)}
                >
                    <Form>
                        <input type='date' />

                        <button type='send'>enviar</button>
                    </Form>
                </Formik>
            </Box>
        </div>
    )
}

export default NewRecordForm