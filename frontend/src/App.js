import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import Register from './components/Register'
import Login from './components/Login'
import Users from './components/Users'
import Posts from './components/Posts';

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <AuthProvider>
  <Router>
    <Routes>
      <Route exact path='/register' element={<Register />} />
      <Route exact path='/login' element={<Login/>} />
      <Route exact path='/users' element={<Users />} />
      <Route exact path='/posts' element={<Posts />} />
    </Routes>
  </Router>
  </AuthProvider>
)

export default App