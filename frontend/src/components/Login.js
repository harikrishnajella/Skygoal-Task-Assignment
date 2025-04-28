import React, { useState, useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Cookies from "js-cookie"

import { AuthContext } from "../contexts/AuthContext";

import '../styles/Login.css'

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })
  const [errMsg, setErrMsg] = useState('')
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate =  useNavigate()
  const { loggedUser } = useContext(AuthContext);

  const handlerChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
  }

  const onSubmitSuccess = (token) => {
    Cookies.set('token', token, {expires: 30})
    navigate("/posts")    
  }

  const onSubmitFailure = (msg) => {
    setErrMsg(msg)
    setShowErrMsg(true)
  }


  const handlerForm = async (e) => {
    setIsLoading(true)
    e.preventDefault()

    //let url = '/api/auth/login'
    let url = 'http://localhost:5000/api/auth/login'

    const options = {
      method: "POST",
      headers:{ 'Content-Type': 'application/json'},
      body: JSON.stringify(userData),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    setIsLoading(false)

    if (response.ok) {
      loggedUser(data);
      onSubmitSuccess(data.token)
    } else {
      onSubmitFailure(data.message)
    }
   
  }

  const token = Cookies.get('token')

  if (token !== undefined){
     return navigate('/posts')
  } else {
    return (
      <div className='login-container'>
        <form onSubmit={handlerForm} className='login-form'>
          <h1 className='login-form-heading'>User Login</h1>
          <div className='login-input-card'>
            <label htmlFor='email' className='login-input-label'>Email</label>
            <input className='login-input' value={userData.email} onChange={handlerChange} id='email' type='email' name='email' placeholder='Enter your email' required />
          </div>
          <div className='login-input-card'>
            <label htmlFor='password' className='login-input-label'>Password</label>
            <input className='login-input' value={userData.password} onChange={handlerChange} id='password' type='password' name='password' placeholder='Enter your password' required />
          </div>
          <button className='login-form-btn' type='submit'>{isLoading ? 'Loading...' : 'Login'}</button>
          {showErrMsg && <p className='login-form-err-msg'>* {errMsg}</p>}
          <p className='login-form-register-here-para'>If you don't have an account ? <Link to='/register'>Register Here</Link></p>
        </form>
      </div>
    )
  }
}

export default Login
