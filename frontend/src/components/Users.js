import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {Container, Table, Button } from 'react-bootstrap';

import Navbar from "../components/Navbar";

const Users = () => {
    const [users, setUsers] = useState([])

    const token = Cookies.get('token')
    //let url = '/api/users'
    let url = 'http://localhost:5000/api/users'

    const fetchData = async () => {
        let options = {
            method: "GET",
            headers: {
             authorization: `Bearer ${token}`
            },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)
        setUsers(data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const deleteUser = async id => {
        if (window.confirm("Are you sure you want to delete the user ?")) {
        const options = {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
        const response = await fetch(`${url}/${id}`, options)
        const data = await response.json()
    
        if (response.ok) {
            const updatedList = users.filter(user => user._id !== id);
            setUsers(updatedList);
            alert(data.message)

        }
     }
    }

  return (
    <div>
      <Navbar />
      <Container>
        <h1 style={{textAlign: "center", margin: "30px"}}>Users List</h1>
        
        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0 && 
            users.map(user => (
              <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                  <Button disabled={user.role === 'admin'} variant="danger" className="me-2 mb-2" onClick={() => deleteUser(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {users.length === 0  &&
         <div style={{textAlign: "center", margin: "30px"}}>
          <h1>Users list is empty...</h1>
         </div>
        }
    </div>
  
  )
}

export default Users