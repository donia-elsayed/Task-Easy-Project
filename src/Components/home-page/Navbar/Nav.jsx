import Button from "@restart/ui/esm/Button";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./Nav.css";
import logo from "../../../assets/images/logo.png";
import {Link} from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import AfterLoginNavbar from "../../sidebar/After-Login-Navbar"
/*start navbar */
const NavBar = ({setShow ,show}) => {
  const {currentUser} = useAuth()
 const renderNavbar=()=>{
   return(
    <Navbar expand="lg" className="container" id="home__nav">
    <Container fluid>
      <Navbar.Brand href="#">
        <Link to="/"><img src={logo} alt="Logo" /></Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        ></Nav>
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About Us</Nav.Link>
        <Nav.Link href="#features">Our Feature</Nav.Link>
        <Nav.Link href="#team">Our Team</Nav.Link>
        <Button className="getStarted__btn btn  ms-2"><Link to="/login" className="text-white text-decoration-none">Login</Link></Button>
        <Button className="getStarted__btn btn  ms-2"><Link to="/signUp" className="text-white text-decoration-none">Register</Link></Button>
      </Navbar.Collapse>
    </Container>
    </Navbar>
   )
 }
  return (
    
    <>
      {
          currentUser ?
          (
           <AfterLoginNavbar setShow={setShow } show={show}/>
          )
          :
          (
           renderNavbar()
          )  
      }
    </>
        
  );
}
/*end navbar */
export default NavBar ;
