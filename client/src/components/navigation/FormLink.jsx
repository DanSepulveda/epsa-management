import { NavLink, useLocation } from 'react-router-dom'

function FormLink({ to, children }) {
  const { pathname } = useLocation()

  const background = to === pathname ? ' bg-pink-500 text-white pointer-events-none' : ''

  return (
    <NavLink
      to={to}
      className={`w-1/2 py-2 text-center select-none text-lg font-medium border border-neutral-400${background}`}
    >
      {children}
    </NavLink>
  )
}

export default FormLink
