import './App.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userState, getUser } from './redux/userSlice'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// COMPONENTS
import Main from './components/layout/Main'
import LogPage from './pages/LogPage'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Records from './pages/Records'
import Archive from './pages/Archive'
import Profile from './pages/Profile'

const App = () => {
  const { _id, tokenlog } = useSelector(userState)

  useEffect(() => {
    if (!_id) getUser()
    //eslint-disable-next-line
  }, [])

  if (tokenlog) {
    return <h1>cargando</h1>
  }

  return (
    <Main>
      <BrowserRouter>
        <Routes>
          {_id && <Route path='/' element={<Dashboard />} />}
          {_id && <Route path='/reports' element={<Reports />} />}
          {_id && <Route path='/records' element={<Records />} />}
          {_id && <Route path='/files' element={<Archive />} />}
          {_id && <Route path='/profile' element={<Profile />} />}
          {!_id && <Route path='/login' element={<LogPage tag='login' />} />}
          {!_id && <Route path='/signup' element={<LogPage />} />}
          <Route path='*' element={<Navigate to={_id ? '/' : '/login'} />} />
        </Routes>
      </BrowserRouter>
    </Main>
  )
}

export default App