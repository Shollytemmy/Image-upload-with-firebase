import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home"
import AddEditUser from "./pages/AddEditUser"
import ErrorPage from "./pages/ErrorPage"


// import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div>
      <Navbar  />
      <Routes>
        <Route path="/"  element={<Home  />} />
        <Route path="add" element={<AddEditUser  />}  />
        <Route path="update/:id" element={<AddEditUser  />} />
         <Route path="*" element={<ErrorPage  />} />
      </Routes>
    </div>
    </BrowserRouter>
    
    
  )
}

export default App
