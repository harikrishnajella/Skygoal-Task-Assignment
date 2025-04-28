import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const handlerLogout = () => {
        Cookies.remove('token')
        navigate('/login')
    }
     
  return (
    <nav className='navbar-container'>
        <div className='navbar-card'>
            {user.role === "admin" &&
            <Link to='/users' className='navbar-link'>Users</Link>
            }
            <Link to='/posts' className='navbar-link'>Posts</Link>
            <button className='navbar-btn' type='button' onClick={handlerLogout}>Logout</button>
        </div>
    </nav>
  )
}

export default Navbar