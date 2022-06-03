import './App.css'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userState, getUser } from './redux/userSlice'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// COMPONENTS
import Main from './components/layout/Main'
import SignIn from './pages/Signin'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Records from './pages/Records'
import Archive from './pages/Archive'
import Profile from './pages/Profile'
import Loader from './components/Loader'
import Students from './pages/Students'

const App = () => {
  const { _id, tokenlog } = useSelector(userState)

  useEffect(() => {
    if (!_id) getUser()
    //eslint-disable-next-line
  }, [])

  if (tokenlog) {
    return <Loader />
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
          {_id && <Route path='/students' element={<Students />} />}
          {!_id && <Route path='/login' element={<SignIn />} />}
          {!_id && <Route path='/signup' element={<SignUp />} />}
          <Route path='*' element={<Navigate to={_id ? '/' : '/login'} />} />
        </Routes>
      </BrowserRouter>
    </Main>
  )
}

export default App