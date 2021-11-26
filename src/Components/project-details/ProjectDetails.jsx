import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router';
import { projectsCollection } from '../../firebase';
import UpdateProjectDetails from './UpdateProjectDetails';
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
        <>
            <Card className="d-flex m-auto w-50 mt-5 rounded-3">
                <Card.Body>
                    <Card.Title><h3 className="text-center text-capitalize mb-4 text-info">Project Details</h3></Card.Title>
                    <Card.Text>
                    <strong className="fs-5 text-info">Project Name : </strong> {projectDetails.projectName}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Start Date: </strong>{projectDetails.startDate}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Due Date: </strong>{projectDetails.dueDate}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Project Description : </strong> {projectDetails.projectDesc}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Assignee : </strong> {projectDetails.assignee}
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
        </>
    )
}

export default ProjectDetails
