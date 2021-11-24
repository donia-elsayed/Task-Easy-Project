import { useState } from "react"
import { useAuth } from "../../context/AuthContext";
import registerImg from "../../../assets/images/register-img.png"
import { Link} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { BiEnvelopeOpen } from "react-icons/bi";
import { FaUserCircle,FaLock } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc"
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import "./signUp-style.scss"
function SignUp() {
  const initialValues = {
    username:"",
    email: "",
    password: "",
    confirmPass: "",
  };
  const {signUp} = useAuth()
  const [signUpData,setSignUpData] = useState({
    email: "",
    name: "",
  })
  const [password,setPassword] = useState("")
  const [confirmPass,setConfirmPass] = useState("")
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
  const [message,setMessage] = useState()
    async function onSubmit(){
      // e.preventDefault()
      try{
        setMessage('')
        setError('')
        setLoading(true)
        await signUp(signUpData.name,signUpData.email,password)
        setMessage('Account Created Successfully')
        setSignUpData({
          email: "",
          name: "",
        })
        setPassword("")
        setConfirmPass("")
      }
      catch{
        setError('Failed to create an account')
      }
      setLoading(false)
    }
  const validationSchema = yup.object({
    username:yup.string().required("Username Field is required"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email field is required"),
    password: yup
      .string()
      .required("Password field is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPass: yup.string()
      .required("Confirm Password field is required")
      .oneOf([yup.ref('password'), null], '* Password must match')
  });
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
     <section className="register__section">
        <div className="container">
            <div className="row register__form">
              <h3 className="text-center text-capitalize">sign up</h3>
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              {message && <Alert variant="success" className="text-center">{message}</Alert>}
              <div className="col-md-6">
                <img src={registerImg} alt="" className="w-100"/>
              </div>
              <div className="col-md-6 register__form__item justify-content-center align-items-center"> 
                <Form onSubmit={formik.handleSubmit} className="m-auto w-75">
                  <Form.Group className="mb-2" controlId="username">
                    <Form.Label>UserName</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUserCircle/>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter UserName"
                        name="username"
                        value={signUpData.name}
                        onChange={(e)=>{
                          setSignUpData({...signUpData,name:e.target.value})
                          formik.handleChange(e)
                        }}
                        
                        onBlur={formik.handleBlur}
                        className={`${formik.touched.username && formik.errors.username && "is-invalid"}`}
                      />
                    </InputGroup>
                  </Form.Group>
                  {formik.touched.username && formik.errors.username && (
                    <div className="text-danger">
                      {formik.errors.username}
                    </div>
                  )}
                  <Form.Group className="mb-2" controlId="Email">
                    <Form.Label className="text-capitalize">email address</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <BiEnvelopeOpen />
                      </InputGroup.Text>
                      <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        name="email"
                        value={signUpData.email}
                        onChange={(e)=>{
                          setSignUpData({...signUpData,email:e.target.value})
                          formik.handleChange(e)
                        }}
                        onBlur={formik.handleBlur}
                        className={`${formik.touched.email && formik.errors.email && "is-invalid"}`}
                      />
                    </InputGroup>
                  </Form.Group>

                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">
                      {formik.errors.email}
                    </div>
                  )}

                  <Form.Group className="mb-2" controlId="Password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={(e)=>{
                          setPassword(e.target.value)
                          formik.handleChange(e)
                        }}
                        onBlur={formik.handleBlur}
                        className={`${
                          formik.touched.password &&
                          formik.errors.password &&
                          "is-invalid"
                        }`}
                      />
                    </InputGroup>
                  </Form.Group>
                  {formik.touched.password && formik.errors.password && (
                    <div className="text-danger ">
                      {formik.errors.password}
                    </div>
                  )}
                  <Form.Group className="mb-2" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaLock />
                      </InputGroup.Text>
                      <Form.Control
                        type="password"
                        placeholder="Enter Confirm Password"
                        name="confirmPass"
                        value={confirmPass}
                        onChange={(e)=>{
                          setConfirmPass(e.target.value)
                          formik.handleChange(e)
                        }}
                        onBlur={formik.handleBlur}
                        className={`${
                          formik.touched.confirmPass &&
                          formik.errors.confirmPass &&
                          "is-invalid"
                        }`}
                      />
                    </InputGroup>
                  </Form.Group>
                  {formik.touched.confirmPass && formik.errors.confirmPass && (
                    <div className="text-danger">
                      {formik.errors.confirmPass}
                    </div>
                  )}
                  <Button variant="outline-light" className="text-center register__btn d-block m-auto mt-2 text-white" type="submit" disabled={loading}>Register</Button>
                </Form>
                <div className="w-100 text-center mt-2">Already have an account? <Link to="/login" className="text-danger">Log In</Link> </div>
              </div>
            </div>
        </div>
      </section> 
  )
}

export default SignUp
