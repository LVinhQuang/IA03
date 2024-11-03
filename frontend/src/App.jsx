import { useState } from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Container from '@mui/material/Container'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {

  return (
    <Router>
      <Container sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/user/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Container>
    </Router>
  )
}

export default App
