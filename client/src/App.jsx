import './App.css'
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userState, loginWithToken } from './redux/userSlice'
import Main from './components/layout/Main'
import LogPage from './pages/LogPage'
import Dashboard from './pages/Dashboard'

const App = () => {
  const id = useSelector(userState)._id
  const dispatch = useDispatch()

  const refreshLogin = async () => {
    await dispatch(loginWithToken())
  }

  useEffect(() => {
    if (!id) refreshLogin()
    //eslint-disable-next-line
  }, [])

  return (
    <Main>
      <BrowserRouter>
        <Routes>
          {id && <Route path='/' element={<Dashboard />} />}
          {!id && <Route path='/login' element={<LogPage tag='login' />} />}
          {!id && <Route path='/signup' element={<LogPage />} />}
          <Route path="*" element={<Navigate to={id ? '/' : "/login"} />} />
        </Routes>
      </BrowserRouter>
    </Main>
  )
}

export default App