/* eslint-disable no-underscore-dangle */
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

function RecordList() {
  const { token, theme } = useSelector(userState)
  const { text } = theme
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const [tag, setTag] = useState('new')
  const [id, setId] = useState(null)
  const { activities } = useSelector(activityState)
  const { records, fetching, fetched } = useSelector(recordState)

  useEffect(() => {
    if (!activities.length) dispatch(getActivities(token))
    if (!records.length) dispatch(getRecords(token))
    //  eslint-disable-next-line
  }, [])

  // prettier-ignore
  const data = tag === 'new' ? null : records.find((record) => record._id === id)

  // prettier-ignore
  const message = fetched && !records.length
    ? <InfoBox>Todavía no ha creado registros para el mes en curso</InfoBox>
    : fetching
      ? <InfoBox searching>Buscando registros</InfoBox>
      : null

  useEffect(() => {
    if (!open) setTag('new')
  }, [open])

  return (
    <div className="flex flex-col">
      <div className="mt-6 mb-9 mx-auto flex items-center">
        <h2 className="text-center text-2xl mr-3">{`Registros (${records.length})`}</h2>
        <IconButton icon="plus" onClick={() => setOpen(true)}>
          Nuevo
        </IconButton>
      </div>
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
          <RecordForm tag={tag} data={data} />
        </OverForm>
      )}
    </div>
  )
}

export default RecordList
