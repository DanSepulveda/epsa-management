import { MdConstruction } from 'react-icons/md'

function UnderConstruction() {
  return (
    <div className="flex flex-col items-center">
      <MdConstruction className="text-7xl fill-zinc-400" />
      <p className="text-zinc-400 text-lg">En construcción</p>
    </div>
  )
}

export default UnderConstruction
