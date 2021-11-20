// import {useState} from 'react'
import { Card } from "react-bootstrap"
import {useAuth} from "./context/AuthContext"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import {usersCollection} from "../firebase"
function Dashboard() {
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
            <Card>
                <Card.Body>
                    <h2 className="text-center text-capitalize mb-4">Profile</h2>
                    <strong>Email:</strong>{currentUser.email}
                    <strong>Username:</strong>{username}
                    
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
                    
                </Card.Body>
               
            </Card> 
       </>
    )
}

export default Dashboard

