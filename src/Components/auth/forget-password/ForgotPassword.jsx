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
           <Card className="d-flex justify-content-center align-items-center m-auto forgot-pass__card py-5">
                <Card.Body className="w-75">
                    <h4 className="text-center text-capitalize mb-4 forgetPass__color">Reset Password</h4>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-4 forgetPass__color" controlId="email">
                            <Form.Label className="fs-5">Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" required ref={emailRef}/>
                        </Form.Group>
                        <button  type="submit" className="btn forgetPass__btn w-50 d-block text-white m-auto" 
                        disabled={loading}>Reset Password</button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/login" className="text-danger fs-5">Login</Link>
                    </div>
                    <div className="w-100 text-center mt-2 forgetPass__color fs-5">Need an account? 
                        <Link to="/signUp" className="text-danger">SignUp</Link>
                    </div>
                </Card.Body>
            </Card> 
        </section>
    )
}
export default ForgotPassword

