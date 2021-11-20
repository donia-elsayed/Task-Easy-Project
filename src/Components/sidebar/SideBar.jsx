import './SideBar.css'
import logo from "../../assets/images/logo.png"
import person from "../../assets/images/person.ico"
import { BsHouseDoorFill,BsPlusCircleFill,BsChatText,BsBell, BsJustify,BsFillPinFill } from "react-icons/bs";
import { RiStackFill } from "react-icons/ri";
import { Button,Card} from "react-bootstrap"
import {useAuth} from "../context/AuthContext"
import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {usersCollection,projectsCollection} from "../../firebase"
import CreatProjectModal from '../create-Project/CreatProjectModal';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaTasks } from 'react-icons/fa';
export const SideBar = () => {

    const show = () =>{
        document.querySelector("#sidebar").classList.toggle("active-nav")
        document.querySelector(".my-container").classList.toggle("active-cont")
      }
      const [projects] = useCollectionData(projectsCollection,{ idField: "id" })
      const [error,setError] = useState("")
      const {currentUser,logOut} = useAuth()
      const [username,setUsername] = useState("")
      const [modalShow, setModalShow] = useState(false);
      const [allProject,setAllProjects] = useState(projects);
      async function handleLogout(){
          setError('')
          try{
            await logOut()
          }
          catch{
             setError('Failed to Logout')
          }
      }
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
        useEffect(()=>{
           
            setAllProjects(projects)
        },[projects])
    return (  
        <div>
            <nav className="home__navbar navbar-expand d-flex flex-column align-item-start p-3" id="sidebar">
                <button className="navbar-brand text-light my-4 border-0 bg-transparent">
                    <div className="display-6">TaskEasy</div>
                </button>
                <ul className="navbar-nav d-flex flex-column  w-100">
                    <li className="nav-item"> <button className="nav-link active border-0 bg-transparent" aria-current="page"> <BsHouseDoorFill/><span className="ms-2">Home</span> </button> </li> 
                    <li> <button className="nav-link text-white border-0 bg-transparent"> <BsFillPinFill/><span className="ms-2"> My Projects</span> </button> </li>
                    <li> <button className="nav-link text-white border-0 bg-transparent"> <RiStackFill/><span className="ms-2"> My tasks </span> </button> </li>
                </ul>
            </nav>
            <section className="p-2 my-container">
                <div className= "navbar__section ps-2  pe-4 d-flex py-2">
                <button className="btn me-3 " id="menu-btn" onClick = {show}> <BsJustify className="fs-3 text-white"/></button>
                    <figure className="m-0">
                    
                        <img src= {logo} className="w-100" alt=""/>
                    </figure>
                    <ul className="d-flex align-items-baseline mb-0">
                        
                        <li className= "px-3 text-capitalize"><BsChatText className="fs-4"/></li>
                        <li className= "px-3 text-capitalize"><BsBell className="fs-4"/></li>
                        
                        <li className= "px-3 text-capitalize">  
                            <div className="dropdown"> 
                                <button className=" text-decoration-none dropdown-toggle border-0 bg-transparent" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false"> 
                                    <img src={person} alt="" width="32" height="32" className="rounded-circle me-2"/> 
                                    <strong>{username}</strong> 
                                    
                                </button>
                                <ul className="mt-3 dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                    <li><Link className="dropdown-item" to="/dashboard">Profile</Link></li>
                                    <li>
                                    <hr className="dropdown-divider"/>
                                    </li>
                                    <li>
                                        <Button variant="link" onClick={handleLogout}>Log Out</Button>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div className="col-lg-2">
                        <Card className="create__project" onClick={() => setModalShow(true)}>
                            <Card.Body className="text-center text-white create__project__body">
                                <Card.Subtitle className="mb-2"><BsPlusCircleFill className="fs-1"></BsPlusCircleFill></Card.Subtitle>
                                <Card.Title className="text-capitalize fs-5">create project</Card.Title>         
                        </Card.Body>
                        </Card>
                        <CreatProjectModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}/>
                    </div>
                    {
                    allProject?.map((proj)=>
                        (
                            <div className="col-lg-2"  key={proj.id}>
                                <Card className="create__project">
                                    <Card.Body className="text-center text-white create__project__body">
                                        <Card.Subtitle className="mb-2"><FaTasks className="fs-1"></FaTasks></Card.Subtitle>
                                        <Card.Title className="text-capitalize fs-5">{proj.projectName}</Card.Title>
                                    </Card.Body>
                                </Card>
                                {/* <CreatProjectModal show={modalShow} onHide={() => setModalShow(false)}/> */}
                            </div>
                        ))
                    }
                </div>
           
            </section>   
        </div>
    )
}
export default SideBar

