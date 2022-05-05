import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LogPage from './pages/LogPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App