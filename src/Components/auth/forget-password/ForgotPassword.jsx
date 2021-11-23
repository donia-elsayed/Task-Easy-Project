import { useRef, useState} from "react"
import { Card ,Button,Form} from "react-bootstrap"
import { useAuth } from "../../context/AuthContext";
import Alert from 'react-bootstrap/Alert'
import { Link} from "react-router-dom";
import "./forget-password.scss"
function ForgotPassword() {
     const emailRef  = useRef();
     const {resetPassword} = useAuth()
     const [error,setError] = useState("")
     const [loading,setLoading] = useState(false)
     const[message,setMessage] = useState()
     async function handleSubmit(e){
       e.preventDefault()
        try{
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Check You Inbox For Further Instruction')
        }
        catch{
           setError('Failed to Reset Password')
        }
        setLoading(false)
     }
    return (
        <section className="forgot-pass__section">
           <Card className="d-flex justify-content-center align-items-center m-auto forgot-pass__card">
                <Card.Body>
                    <h3 className="text-center text-capitalize mb-4">Password Reset</h3>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100" disabled={loading}>Reset Password</Button>
                    </Form>
                    <div className="w-100 text-center mt-2"><Link to="/login">Log In</Link></div>
                </Card.Body>
                <div className="w-100 text-center mb-5">Need an account? <Link to="/signUp">Sign Up</Link></div>
            </Card> 
        </section>
    )
}
export default ForgotPassword

