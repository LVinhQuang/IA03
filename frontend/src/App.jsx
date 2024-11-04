import { useState } from 'react'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Container from '@mui/material/Container'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile';

function App() {

  return (
    <Router>
      <Container sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
        <Routes>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/register' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='*' element={<Profile/>}/>
        </Routes>
      </Container>
    </Router>
  )
}

export default App
