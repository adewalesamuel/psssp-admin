import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Routes as AppRoutes }  from './routes'
import { Views } from './views'
 
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter basename='/admin'>
      <Routes>
        <Route path='*' element={<AppRoutes.MainRoutes />} />
        <Route path='/login' element={<Views.LoginView />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
