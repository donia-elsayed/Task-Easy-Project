import { useRef, useState,useEffect } from "react"
import { Card ,Button,Form} from "react-bootstrap"
import { useAuth } from "./context/AuthContext";
import Alert from 'react-bootstrap/Alert'
import { Link,useNavigate} from "react-router-dom";
import {usersCollection} from "../firebase"
function UpdateProfile(props) {
    //  const usernameRef = useRef();
    //  const emailRef  = useRef();
     const passwordRef = useRef();
     const confirmPasswordRef = useRef();
     const {currentUser,updateEmail,updatePassword} = useAuth()
     const [error,setError] = useState("")
     const [loading,setLoading] = useState(false)
     const [docId,setDocId] = useState("")
    //  const [username,setUsername] = useState("")
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
            // setUsername(data.name);
            setUserDate(data.data())
            setDocId(data.id)
          } catch (err) {
            console.error(err);
          }
    }
    useEffect(()=>{
        getUsername()
    },[])
    useEffect(()=>{
        // setUserDate(currentUser)
        console.log(userData)
    },[userData])
    function handleSubmit(e){
       e.preventDefault()
        // if(passwordRef.current.value !== confirmPasswordRef.current.value){
        //    return setError('password do not match')
        // }
        const promises =[]
        setLoading(true)
        setError("")
        // if(usernameRef.current.value !== username){
        //     promises.push(updateUsername(usernameRef.current.value))
        // }
        usersCollection.doc(docId).update(userData);
//         usersCollection.get().then((querySnapshot) => 
// {querySnapshot.forEach((doc) => {console.log(`${doc.id} => ${doc.data()}`);});
        // if(userData.email !== currentUser.email){
           
        //     updateEmail(userData.email);
        // }
        // if(passwordRef.current.value){
        //    updatePassword(passwordRef.current.value)
        // }
        Promise.all(promises).then(()=>{
            navigate("/login")
        }).catch(()=>{
            setError('Failed to update an account')
        }).finally(()=>{
            setLoading(false)
        })
     }
    return (
        <>
           <Card>
                <Card.Body>
                    <h2 className="text-center text-capitalize mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" required 
                              defaultValue={userData.name}
                              onChange={(e)=>setUserDate({...userData,name:e.target.value})}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required 
                              defaultValue={userData.email}
                              onChange={(e)=>setUserDate({...userData,email:e.target.value}
                                )}
                            />
                        </Form.Group>
                        {userData.authProvider ==="local" && 
                        <>
                        <Form.Group className="mb-3" controlId="Password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Leave blank to keep the same" ref={passwordRef}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Leave blank to keep the same">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef}/>
                        </Form.Group>
                        </>
                       
                        
                        }
                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>Update</Button>
                    </Form>
                </Card.Body>
            </Card> 
            <div className="w-100 text-center mt-2"> <Link to="/">Cancel</Link> </div>
        </>
    )
}
export default UpdateProfile

