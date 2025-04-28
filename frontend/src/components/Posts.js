import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import {Container, Table, Button } from 'react-bootstrap';

import Navbar from "../components/Navbar";

const Posts = () => {
    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [isEditing, setIsEditing] = useState(false);
   const [editPostId, setEditPostId] = useState(null);

    const token = Cookies.get('token')
    let url = 'https://skygoal-task-assignment-backend.onrender.com/api/posts'

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
        setPosts(data)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const deletePost = async id => {
        if (window.confirm("Are you sure you want to delete the post ?")) {
        const options = {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`
          }
        }
        const response = await fetch(`${url}/${id}`, options)
        const data = await response.json()
    
        if (response.ok) {
            const updatedList = posts.filter(user => user._id !== id);
            setPosts(updatedList);
            alert(data.message)
        }
     }
    }

    const addNewPost = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({title, content})
        }
    
        const response = await fetch(url, options)
        await response.json()

        if (response.ok) {
            fetchData()
            setTitle('')
            setContent('')
        }
    }

    const editPost = (post) => {
        setIsEditing(true);
        setEditPostId(post._id);
        setTitle(post.title);
        setContent(post.content);
    }

    const updatePost = async () => {
        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, content })
        };
    
        const response = await fetch(`${url}/${editPostId}`, options);
        await response.json();
        
        if (response.ok) {
            fetchData();
            setTitle('');
            setContent('');
            setIsEditing(false);
            setEditPostId(null);
        }
    }
    
    

  return (
    <div>
      <Navbar />
      <Container>
        <h1 style={{textAlign: "center", margin: "30px"}}>Posts List</h1>

       <div style={{display: "flex", justifyContent: "space-around", alignContent: "center",  margin: "10px", padding: "10px"}}>
             <input  style={{padding: "10px", width: "30%", border: "1px solid #ccc", borderRadius: "8px", marginRight: "10px"}} onChange={(e) => setTitle(e.target.value)} value={title} type='text' placeholder='Enter title name' required />
             <input style={{padding: "10px", width: "30%", border: "1px solid #ccc", borderRadius: "8px", marginRight: "10px"}} onChange={(e) => setContent(e.target.value)} value={content} type='text' placeholder='Enter content description' required/>
             <Button variant="primary" className="mb-3" onClick={isEditing ? updatePost : addNewPost}>
                {isEditing ? 'Update Post' : 'Add Post'}
            </Button>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length !== 0 && 
            posts.map(post => (
              <tr key={post._id}>
              <td>{post._id}</td>
              <td>{post.title}</td>
              <td>{post.content}</td>
              <td>
                 <Button variant="warning" className="me-2 mb-2" onClick={() => editPost(post)}>
                    Edit
                  </Button>
                  <Button variant="danger" className="me-2 mb-2" onClick={() => deletePost(post._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      {posts.length === 0  &&
         <div style={{textAlign: "center", margin: "30px"}}>
          <h1>Posts list is empty...</h1>
         </div>
        }
    </div>
  
  )
}

export default Posts