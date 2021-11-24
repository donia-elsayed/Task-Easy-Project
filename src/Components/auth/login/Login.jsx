import { useRef, useState} from "react"
import loginImg from  "../../../assets/images/login-image.jpeg"
import { Button,Form} from "react-bootstrap"
import { BiEnvelopeOpen } from "react-icons/bi";
import { FaLock } from "react-icons/fa";
import { InputGroup } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import {BsFillEyeSlashFill} from 'react-icons/bs'
import Alert from 'react-bootstrap/Alert'
import { Link,useNavigate} from "react-router-dom";
import firebase from "@firebase/app-compat"
import { useFormik } from "formik";
import * as yup from "yup";
import {usersCollection} from "../../../firebase"
import './login-style.scss'
import { FcGoogle } from "react-icons/fc";
function Login() {
     const emailRef  = useRef();
     const passwordRef = useRef();
     const {logIn} = useAuth()
     const [error,setError] = useState("")
     const [loading,setLoading] = useState(false)
     const navigate = useNavigate();
      async function onSubmit(){
    //    e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await logIn(emailRef.current.value,passwordRef.current.value)
            navigate("/login-home")
        }
        catch{
           setError('Failed to Log In')
        }
        setLoading(false)
     }
   
     async function signInWithFirebase(){
        const google_provider = new firebase.auth.GoogleAuthProvider()
        try {
            const res = await firebase.auth().signInWithPopup(google_provider);
            const user = res.user;
            const query = await usersCollection
              .where("uid", "==", user.uid)
              .get();
            if (query.docs.length === 0) {
              await usersCollection.add({
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
                photoURL:user.photoURL
              });
            }
            navigate("/login-home")
        } 
        catch (err) {
            console.error(err);
        }
     }
     const initialValues = {
        email: "",
        password: "",
        rememberMe: false,
    };
    const validationSchema = yup.object({
        email: yup.string()
        .email("Please enter a valid email address")
        .required("Email field is required"),
        password: yup.string()
        .required("Password field is required")
    });
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
      };
    return (
        <section className="login__section">
            <div className="container">
                <div className="row login__form justify-content-center align-items-center">
                    <h3 className="text-center text-capitalize">log in</h3>
                    {error && <Alert variant="danger" className="text-center m-auto">{error}</Alert>}
                    <div className="col-md-6 login__image">
                        <img src={loginImg} alt="" className="w-100"/>
                    </div>
                    <div className="col-md-6 login__form__item">
                        <div className="d-flex justify-content-center align-items-center">
                            <Form onSubmit={formik.handleSubmit} className="w-75">
                                <Form.Group className="mb-2" controlId="Email">
                                    <Form.Label className="">Email address</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <BiEnvelopeOpen/>
                                        </InputGroup.Text>
                                        <Form.Control type="email" placeholder="Enter email" 
                                            name="Email" {...formik.getFieldProps("email")} 
                                            ref={emailRef}
                                            className={`${formik.touched.email && formik.errors.email && 'is-invalid'}`}>
                                        </Form.Control>
                                    </InputGroup>
                                </Form.Group>
                                {formik.touched.email && formik.errors.email &&(
                                <div className="text-danger">{formik.errors.email}</div>
                                )}
                                <Form.Group className="mb-2" controlId="Password">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="password__wrap">
                                        <InputGroup.Text>
                                        <FaLock/>
                                        </InputGroup.Text>
                                        <Form.Control type={passwordShown ? "text" : "password"} placeholder="Enter Password" 
                                        name="password" {...formik.getFieldProps("password")}
                                        ref={passwordRef}
                                        className={`${formik.touched.password && formik.errors.password && 'is-invalid'}`}/>
                                        <BsFillEyeSlashFill className="fs-4 icon" onClick={togglePasswordVisibility}></BsFillEyeSlashFill>
                                    </InputGroup>
                                </Form.Group>
                                {formik.touched.password && formik.errors.password && (
                                <div className="text-danger">{formik.errors.password}</div>
                                )}
                                <div className="d-flex justify-content-between">
                                    <Form.Group className="mb-2" controlId="rememberMe">
                                        <Form.Check type="checkbox" label="Remember Me" name="rememberMe"
                                        {...formik.getFieldProps("rememberMe")}/>
                                    </Form.Group>
                                    <Link to="/forgot-password" className="forget__pass">Forgot password?</Link>
                                </div>
                                <Button variant="outline-danger" type="submit" className="d-block m-auto mb-1 text-white" disabled={loading}>Login</Button>
                                <div className="d-flex justify-content-md-between">
                                    <div className="signIn__option"></div>
                                    <span>OR</span>
                                    <div className="signIn__opt"></div>
                                </div>
                                <Button variant="outline-light" className="w-100 text-danger bg-light mt-2" onClick={signInWithFirebase}><FcGoogle className="text-center fs-4"></FcGoogle> Sign In With Google</Button>
                                <div className="w-100 text-center mt-2 text-capitalize">Need an account? <Link to="/signUp" 
                                 className="text-danger">signUp</Link></div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>   
        </section>  
       
    )
}
export default Login
