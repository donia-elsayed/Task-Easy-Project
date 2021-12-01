// import {useState} from 'react'
import { Card } from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react"
import {usersCollection} from "../../firebase"
import './profile.scss'
function Profile({show}) {
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
      <section className={`row justify-content-center profile__section gx-0 ${show?"active-cont":""}`}>
        <Card className="col-lg-6 profile__card">
          <Card.Body className="m-auto">
            <Card.Title><h3 className="text-center text-capitalize mb-4 text-info">Profile</h3></Card.Title>
            <Card.Text>
              <strong className="text-info fs-5">Email: </strong>
              <span>{currentUser.email}</span>  
            </Card.Text>
            <Card.Text>
              <strong className="text-info fs-5">Username: </strong>
              <span>{username}</span>
            </Card.Text>
            <button type="submit" className="btn btn-info text-white d-flex justify-content-center w-auto m-auto mt-5">
              <Link to="/update-profile" className="text-white text-decoration-none fs-5">Update Profile</Link>
            </button>
          </Card.Body>
        </Card> 
      </section>
    )
}

export default Profile

