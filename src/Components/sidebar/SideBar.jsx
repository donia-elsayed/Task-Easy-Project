import {BsPlusCircleFill } from "react-icons/bs";
import { Card, Form,InputGroup} from "react-bootstrap"
import {useState,useEffect} from 'react'
import {projectsCollection} from "../../firebase"
import CreatProjectModal from '../create-Project/CreatProjectModal';
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FaTasks } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import {GoSearch} from 'react-icons/go'
import { auth } from "../../firebase";
import './SideBar.css'
export const SideBar = ({ show }) => { 
    const [modalShow, setModalShow] = useState(false);
    const query =
      auth.currentUser.uid &&
      projectsCollection.where("userId", "==", auth.currentUser.uid);
    const [projects] = useCollectionData(query, { idField: "id" });
    const [allProject, setAllProjects] = useState(projects);
    const navigate = useNavigate();
    const addTask = (id) => {
        navigate(`/tabs`, { state: { projectid: id } });
    };
    useEffect(() => {
      setAllProjects(projects);
      setModalShow(false)
    }, [projects]);
     //start search
    const searchByName = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
        const results = projects.filter((proj) => {
            console.log (proj)
            return  proj.projectName.toLowerCase().startsWith(keyword.toLowerCase());
        
        });
        setAllProjects(results);
        } else {
        setAllProjects(projects);
    
        }
    };
  //end search
    return (  
        <section className="ms-3"> 
            <div className={`dash__features ${show ? "active-cont" : ""}`}>
                <div className="my-5 ms-3">
                    <div className="col-md-8">
                        <Form className="d-flex">
                            <InputGroup> 
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    onChange={searchByName}
                                    className="p-2"
                                    aria-label="Search">
                                </Form.Control>
                                <InputGroup.Text>
                                    <GoSearch/>
                                </InputGroup.Text>
                            </InputGroup>  
                        </Form>
                    </div>
                </div>
                <div className="row m-0 m-auto">
                    <div className="col-lg-2 col-md-3 col-sm-6 mb-3 margin__r">
                        <Card className="create__project" onClick={() => setModalShow(true)}>
                            <Card.Body className="text-center text-white d-flex flex-wrap justify-content-center align-items-center flex-column">
                                <Card.Subtitle className="mb-2"><BsPlusCircleFill className="fs-1"></BsPlusCircleFill></Card.Subtitle>
                                <Card.Title className="text-capitalize fs-5">create project</Card.Title>         
                        </Card.Body>
                        </Card>
                        <CreatProjectModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            className="modal__small"/>
                    </div>
                    {
                        allProject?.map((proj)=>
                        (
                            <div className="col-lg-2 col-md-3 col-sm-6 mb-3 margin__r"  
                                key={proj.id}  
                                onClick={() => addTask(proj.id)}>
                                <Card className="create__project">
                                    <Card.Body className="text-center text-white d-flex flex-wrap justify-content-center align-items-center flex-column">
                                        <Card.Subtitle className="mb-2">
                                            <FaTasks className="fs-1"></FaTasks>
                                        </Card.Subtitle>
                                        <Card.Title className="text-capitalize fs-5">
                                            {proj.projectName}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </div>
                        ))
                    }
                </div>
            </div>  
        </section>
    )
}
export default SideBar

