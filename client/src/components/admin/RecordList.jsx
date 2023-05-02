import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActivities, activityState } from '../../redux/activitySlice'
import { getRecords, recordState } from '../../redux/recordSlice'
import { userState } from '../../redux/userSlice'
import IconButton from '../buttons/IconButton'
import RecordForm from '../forms/RecordForm'
import InfoBox from '../InfoBox'
import OverForm from '../layout/OverForm'
import RecordRow from './RecordRow'
import themes from '../../app/themes'

const RecordList = () => {
  const { text, common } = themes.default
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [tag, setTag] = useState('new')
  const [id, setId] = useState(null)
  const activities = useSelector(activityState).activities
  const token = useSelector(userState).token
  const { records, fetching, fetched } = useSelector(recordState)

  useEffect(() => {
    if (!activities.length) dispatch(getActivities(token))
    const date = new Date()
    const format = `${date.getFullYear()}-${date.getMonth() + 1}`
    dispatch(getRecords({ token, date: format }))
    //eslint-disable-next-line
  }, [])

  const sendReq = (date) => {
    dispatch(getRecords({ token, date }))
  }

  const data = tag === 'new' ? null : records.find((record) => record._id === id)

  const message =
    fetched && !records.length ? (
      <InfoBox>Todavía no ha creado registros para el mes en curso</InfoBox>
    ) : fetching ? (
      <InfoBox searching={true}>Buscando registros</InfoBox>
    ) : null

  useEffect(() => {
    if (!open) setTag('new')
  }, [open])

  return (
    <div className="flex flex-col">
      <div className="mt-6 mb-9 mx-auto flex items-center">
        <h2 className="text-center text-2xl mr-3">{`Registros (${records.length})`}</h2>
        <IconButton
          icon="plus"
          onClick={() => setOpen(true)}
        >
          Nuevo
        </IconButton>
      </div>
      <input
        type="month"
        onChange={(e) => sendReq(e.target.value)}
        className={`py-1 px-2 mb-5 border ${common.inputBorder}`}
      />
      {message}
      <div className="flex flex-col gap-2">
        {records.map((record) => (
          <RecordRow
            key={record._id}
            record={record}
            setOpen={setOpen}
            setTag={setTag}
            setId={setId}
          />
        ))}
      </div>
      {open && (
        <OverForm setOpen={setOpen}>
          <h2 className={`text-center mb-7 text-2xl font-bold uppercase ${text.formTitle}`}>
            {tag === 'new' ? 'Crear registro' : 'Editar registro'}
          </h2>
          <RecordForm
            tag={tag}
            data={data}
          />
        </OverForm>
      )}
    </div>
  )
}

export default RecordList
