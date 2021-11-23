// import {useState} from 'react'
import { Card } from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import {usersCollection} from "../../firebase"
function Profile() {
    const [username,setUsername] = useState("")
    const {currentUser} = useAuth()
    async function getUsername(){
        try {
            const query = await usersCollection
              .where("uid", "==", currentUser?.uid)
              .get();
            const data = await query.docs[0].data();
            setUsername(data.name);
          } catch (err) {
            console.error(err);
          }
    }
    useEffect(()=>{
        getUsername()
    })
    return (
      <>
        <Card className="d-flex m-auto w-50 mt-5">
          <Card.Body>
            <Card.Title><h2 className="text-center text-capitalize mb-4 text-info">Profile</h2></Card.Title>
            <Card.Text>
              <strong className="fs-5 text-info">Email: </strong>{currentUser.email}  
            </Card.Text>
            <Card.Text>
              <strong className="fs-5 text-info">Username: </strong>{username}
            </Card.Text>
            <button type="submit" className="btn btn-info text-white d-flex justify-content-center w-auto m-auto mt-3">
              <Link to="/update-profile" className="text-white text-decoration-none fs-5">Update Profile</Link>
            </button>
            
          </Card.Body>
        </Card> 
      </>
    )
}

export default Profile

