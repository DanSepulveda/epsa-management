import { useState } from 'react'
import { useSelector } from 'react-redux'
import { activityState } from '../../redux/activitySlice'
import { userState } from '../../redux/userSlice'
import IconButton from '../buttons/IconButton'
import TemplateForm from '../forms/TemplateForm'
import InfoBox from '../InfoBox'
import OverForm from '../layout/OverForm'
import ActRow from './ActRow'

function ActTemplates() {
  const { theme } = useSelector(userState)
  const { text } = theme
  const [open, setOpen] = useState(false)
  const { activities } = useSelector(activityState)

  const message = !activities.length ? (
    <InfoBox>Aún no ha creado ninguna plantilla</InfoBox>
  ) : null

  return (
    <div className="flex flex-col">
      <div className="mt-6 mb-9 mx-auto flex items-center">
        <h2 className="text-center text-2xl mr-3">{`Plantillas (${activities.length})`}</h2>
        <IconButton icon="plus" onClick={() => setOpen(true)}>
          Nueva
        </IconButton>
      </div>
      {message}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activities.map((activity) => (
          <ActRow key={activity._id} activity={activity} />
        ))}
      </div>
      {open && (
        <OverForm setOpen={setOpen}>
          <h2
            className={`text-center mb-7 text-2xl font-bold uppercase ${text.formTitle}`}
          >
            Crear plantilla
          </h2>
          <TemplateForm
            tag="new"
            data={null}
            editable={null}
            setEditable={null}
          />
        </OverForm>
      )}
    </div>
  )
}

export default ActTemplates
