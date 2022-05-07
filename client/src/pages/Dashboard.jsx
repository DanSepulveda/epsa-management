import { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import AdminView from '../components/layout/AdminView'
import DailyRecord from '../components/forms/DailyRecord'

const Dashboard = () => {
    const [inputQty, setInputQty] = useState([1, 2, 3, 4, 5, 6])
    const [initialValues, setInitialValues] = useState({})

    useEffect(() => {
        let values = {}
        for (let i = 1; i <= inputQty.length; i++) {
            values[`act${i}`] = ''
            values[`description${i}`] = ''
        }
        setInitialValues({ ...initialValues, ...values })
    }, [inputQty])

    console.log(initialValues)

    return (
        <AdminView>
            <div>hola</div>
            <div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={values => console.log(values)}
                >
                    <Form>
                        <input type='date' />
                        {inputQty.map(input => <DailyRecord key={input} input={input} />)}
                        <button type='send'>enviar</button>
                    </Form>
                </Formik>
            </div>
        </AdminView>
    )
}

export default Dashboard