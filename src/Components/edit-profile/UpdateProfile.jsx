import { useRef, useState,useEffect } from "react"
import { Card ,Form} from "react-bootstrap"
import { useAuth} from "../context/AuthContext";
import Alert from 'react-bootstrap/Alert'
import { Link,useNavigate} from "react-router-dom";
import {usersCollection} from "../../firebase"
import "./update-profile.scss"
function UpdateProfile(props) {
     const passwordRef = useRef();
     const confirmPasswordRef = useRef();
     const {currentUser,updatePassword,updateEmail,logOut} = useAuth()
     const [error,setError] = useState("")
     const [loading,setLoading] = useState(false)
     const [docId,setDocId] = useState("")
     const [userData,setUserDate] = useState( {
        email: "",
        name: "",  
    })
     const navigate = useNavigate();
     async function getUsername(){
        try {
            const query = await usersCollection
              .where("uid", "==", currentUser?.uid)
              .get();
            const data = await query.docs[0];
            setUserDate(data.data())
            setDocId(data.id)
          } 
          catch (err) {
            console.error(err);
          }
    }
    useEffect(()=>{
        getUsername()
    },[])
    useEffect(()=>{
        setUserDate(userData)
    },[userData])
     function handleSubmit(e){
        e.preventDefault()
        const promises = []
        setLoading(true)
        setError("")
        if(userData.authProvider === "local")
        {
            if(passwordRef.current.value !== confirmPasswordRef.current.value){
                return setError('password do not match')
            }
            if(passwordRef.current.value){
                promises.push(updatePassword(passwordRef.current.value))
            }   
        }
        if(userData.email !== currentUser.email){
            promises.push(updateEmail(userData.email))
        }
         usersCollection.doc(docId).update(userData);
       
        Promise.all(promises)
        .then(() => {
            navigate("/login")
            logOut()
        })
        .catch(() => {
            setError('Failed to update an account')
        })
        .finally(() => {
            setLoading(false)
        })  
    }
    return (
        <section className="update-profile__section">
           <Card className="d-flex m-auto update-profile__card">
                <Card.Body>
                    <h3 className="text-center text-capitalize">Update Profile</h3>
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                    <Form onSubmit={handleSubmit} className="w-75 m-auto">
                    <Form.Group className="mb-2" controlId="username">
                            <Form.Label className="input__label">Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" required 
                              defaultValue={userData.name}
                              onChange={(e)=>setUserDate({...userData,name:e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="email">
                            <Form.Label className="input__label">Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required 
                              defaultValue={userData.email}
                              onChange={(e)=>setUserDate({...userData,email:e.target.value}
                                )}
                            />
                        </Form.Group>
                        {userData.authProvider ==="local" && 
                        <>
                        <Form.Group className="mb-2" controlId="Password">
                            <Form.Label className="input__label">Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="Leave blank to keep the same or enter new password">
                            <Form.Label className="input__label">Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same or enter new confirm password" ref={confirmPasswordRef}/>
                        </Form.Group>
                        </>
                        }
                        <button type="submit" className="btn text-white update__btn d-flex justify-content-center w-auto m-auto mt-2" disabled={loading}>Update</button>
                    </Form>
                    <div className="w-100 text-center mt-1"> <Link to="/login-home" className="text-info">Cancel</Link> </div>
                </Card.Body>
            </Card> 
        </section>
    )
}
export default UpdateProfile

