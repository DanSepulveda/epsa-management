import { useState } from 'react'
import IconButton from '../buttons/IconButton'
import TemplateForm from '../forms/TemplateForm'

const ActTemplates = () => {
    const [open, setOpen] = useState(false)

    return (
        <div>
            <IconButton icon='plus' onClick={() => setOpen(true)}>
                Nueva plantilla
            </IconButton>
            {open && <TemplateForm setOpen={setOpen} />}
        </div>
    )
}

export default ActTemplates