import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogPage from './pages/LogPage'
import Main from './components/atoms/Main'

const App = () => {
  return (
    <Main>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LogPage tag='login' />} />
          <Route path='/signup' element={<LogPage />} />
        </Routes>
      </BrowserRouter>
    </Main>
  )
}

export default App