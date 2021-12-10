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
        <Card className="profile__card">
          <Card.Body >
            <Card.Title><h3 className="text-center text-capitalize profile__color">Profile</h3></Card.Title>
            <div className="d-flex justify-content-evenly align-items-center img__container">
              <div className="d-flex justify-content-center align-items-center bg-light rounded-circle profile__img">
                <div className="profile__color">{username.slice(0,2).toUpperCase()}</div>
              </div>
              <div>
                <Card.Text>
                  <strong className="profile__color">Email: </strong>
                  <span>{currentUser.email}</span>  
                </Card.Text>
                <Card.Text>
                  <strong className="profile__color">Username: </strong>
                  <span>{username}</span>
                </Card.Text>
              </div>
            </div>
            <button type="submit" className="btn profile__btn text-white d-block w-auto m-auto mt-3">
              <Link to="/update-profile" className="text-white text-decoration-none">Update Profile</Link>
            </button>
          </Card.Body>
        </Card> 
      </section>
    )
}

export default Profile