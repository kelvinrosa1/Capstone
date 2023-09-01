// import { useState } from 'react'
import './App.css'
import Navabar from './Components/Navabar'
import { Routes, Route } from 'react-router'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profile'
import SingleProduct from './Components/SingleProduct'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <Navabar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/product/:id' element={<SingleProduct/>}/>
    </Routes>
    </>
  )
}

export default App