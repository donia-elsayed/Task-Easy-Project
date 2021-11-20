import { useRef, useState } from "react"
import { useAuth } from "../../context/AuthContext";
import registerImg from "../../../assets/images/register-img.png"
import { Link} from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { BiEnvelopeOpen } from "react-icons/bi";
import { FaUserCircle,FaLock } from "react-icons/fa";
import {FcGoogle} from "react-icons/fc"
import { Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import "./signUp-style.scss"
function SignUp() {
  const initialValues = {
    username:"",
    email: "",
    password: "",
    confirmPass: "",
  };
  const usernameRef = useRef();
  const emailRef  = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef()
  const {signUp} = useAuth()
  const [error,setError] = useState("")
  const [loading,setLoading] = useState(false)
     
  function handleSubmit(e){
    e.preventDefault()
    if(passwordRef.current.value !== confirmPasswordRef.current.value){
      return setError('password do not match')
    }
    try{
      setError('')
      setLoading(true)
      signUp(emailRef.current.value,usernameRef.current.value,passwordRef.current.value)
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
    confirmPass: yup.string().required("Password field is required"),
  });
  const formik = useFormik({
    signUp,
    initialValues,
    validationSchema,
  });
  return (
     <section className="register__section">
        <div className="container">
            <div className="row register__form m-auto justify-content-center align-items-center">
              <h3 className="text-center text-capitalize text-danger">sign up</h3>
              <div className="col-md-6 register__image">
                <img src={registerImg} alt="" className="w-100"/>
              </div>
              <div className="col-md-6 register__form__item mb-5">
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit} className="m-auto w-75">
                  <Form.Group className="mb-2" controlId="username">
                    <Form.Label>UserName</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaUserCircle/>
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter UserName"
                        ref={usernameRef}
                        name="username"
                        {...formik.getFieldProps("username")}
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
                        ref={emailRef}
                        {...formik.getFieldProps("email")}
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
                        ref={passwordRef}
                        {...formik.getFieldProps("password")}
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
                        ref={confirmPasswordRef}
                        {...formik.getFieldProps("confirmPass")}
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
                  <div className="d-flex justify-content-md-between">
                    <div className="signUp__option"></div>
                    <span>OR</span>
                    <div className="signUp__opt"></div>
                  </div>
                  <Button variant="outline-light" className="w-100 text-danger bg-light mt-2"><FcGoogle className="text-center fs-4"></FcGoogle> Sign Up With Google</Button>
                  
                </Form>
                <div className="w-100 text-center mt-2">Already have an account? <Link to="/login" className="text-danger">Log In</Link> </div>
              </div>
            </div>
        </div>
      </section> 
  )
}

export default SignUp
