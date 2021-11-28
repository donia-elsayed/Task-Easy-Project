import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router';
import { projectsCollection } from '../../firebase';
import UpdateProjectDetails from './UpdateProjectDetails';
import './project-details.scss'
function ProjectDetails() {
    const [modalShow, setModalShow] = useState(false);
    const [projectDetails, setProjectDetails] = useState([]);
    const location = useLocation();
    const proj = location.state.projectId;
    const clickedProject = ()=> {
        projectsCollection.doc(proj).get()
        .then(projectDetails => setProjectDetails(projectDetails.data()));
    }
    useEffect(()=>{
        clickedProject()
    },[])
    return (
        <section className="project__details__section">
            <Card className="project__details__card">
                <Card.Body>
                    <Card.Title><h3 className="text-center text-capitalize mb-4 text-info">Project Details</h3></Card.Title>
                    <Card.Text>
                        <strong className="text-info">Project Name : </strong> 
                        <span>{projectDetails.projectName}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="text-info">Start Date: </strong>
                        <span>{projectDetails.startDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="text-info">Due Date: </strong>
                        <span>{projectDetails.dueDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="text-info">Project Description : </strong> 
                        <span>{projectDetails.projectDesc}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="text-info">Assignee : </strong> 
                        <span>{projectDetails.assignee}</span>
                    </Card.Text>
                    <button type="submit" 
                    className="btn btn-info text-white d-flex justify-content-center w-auto m-auto mt-3"
                    onClick={() => setModalShow(true)}>
                    Update Project Details
                    </button>
                </Card.Body>
            </Card>
            <UpdateProjectDetails
                show={modalShow}
                onHide={() => setModalShow(false)}
                project={projectDetails}
            />
        </section>
    )
}

export default ProjectDetails
