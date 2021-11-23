
import {BsPlusCircleFill } from "react-icons/bs";
import { Card, Form, FormControl} from "react-bootstrap"
// import {useAuth} from "../context/AuthContext"
import {useState,useEffect} from 'react'
// import { Link } from 'react-router-dom'
import {projectsCollection} from "../../firebase"
import CreatProjectModal from '../create-Project/CreatProjectModal';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaTasks } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import './SideBar.css'
import Button from 'react-bootstrap/Button'
export const SideBar = () => {

    
      const [projects] = useCollectionData(projectsCollection,{ idField: "id" })
      const [allProject,setAllProjects] = useState(projects);
      const [modalShow, setModalShow] = useState(false);
      const navigate = useNavigate();
      const addTask = () =>{
        navigate("/add-todo")
      }
        useEffect(()=>{
            setAllProjects(projects)
        },[projects])
    return (  
        <> 
            <div className="container">
                <div className="row justify-content-center my-5">
                    <div className="col-8">
                        <Form className="d-flex">
                            <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2 p-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-info" className="bg-info text-white">Search</Button>
                        </Form>
                    </div>
                </div>
                <div className="row">
                    <div className="offset-lg-2 col-lg-2 col-md-3 col-sm-6">
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
                            <div className="col-lg-2"  key={proj.id} onClick={addTask}>
                                <Card className="create__project">
                                    <Card.Body className="text-center text-white create__project__body">
                                        <Card.Subtitle className="mb-2"><FaTasks className="fs-1"></FaTasks></Card.Subtitle>
                                        <Card.Title className="text-capitalize fs-5">{proj.projectName}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </>
    )
}
export default SideBar

