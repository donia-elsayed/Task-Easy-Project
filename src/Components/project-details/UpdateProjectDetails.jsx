
import {  useEffect, useState } from 'react'
import { Alert, Col, Form, FormGroup, Modal, Row } from 'react-bootstrap'
import Button from "react-bootstrap/Button"
import { useLocation } from 'react-router';
import { projectsCollection } from '../../firebase'
function UpdateProjectDetails(props,project) {
    const location = useLocation();
    const proj = location.state.projectid;
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const [message,setMessage]= useState('')
    const [docId,setDocId] = useState(proj)
    const [singleProject,setSingleProject]= useState({
        projectName:"",
        startDate:"",
        dueDate:"",
        projectDesc:"",
        assignee:""
    });
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError('')
            setLoading(true)
            await projectsCollection.doc(docId).update(singleProject);
            setMessage('Updated Successfully');
            console.log(singleProject)
        }
        catch{
            setError('Failed to Update Project Details') 
        }  
    }
    useEffect(()=>{
        setSingleProject(project) 
    },[project])
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" className="text-capitalize">
                       Update project Details
                    </Modal.Title>
                </Modal.Header>  
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                {message && <Alert variant="success" className="text-center">{message}</Alert>} 
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="projectName">
                            <Form.Label className="text-capitalize">project name</Form.Label>
                            <Form.Control placeholder="Enter Project Name" name="projectName"
                               className="border-0 border-bottom create__input"
                               defaultValue={props.project.projectName}
                               onChange={(e)=>{
                                setSingleProject({...singleProject,projectName:e.target.value})
                                setLoading(false)
                               }  
                            }
                               />
                        </Form.Group>
                        <Row className="mb-3">
                            <div className="col-6">
                                <Form.Group as={Col} controlId="startDate">
                                    <Form.Label className="text-capitalize">start date</Form.Label>
                                    <Form.Control type="date" className="border-0 border-bottom create__input"
                                    name="startDate" defaultValue={props.project.startDate} 
                                    onChange={(e)=>{
                                        setSingleProject({...singleProject,startDate:e.target.value})
                                        setLoading(false)
                                    }}/>
                                </Form.Group>
                            </div>
                            <div className="col-6">
                                <Form.Group as={Col} controlId="dueDate">
                                    <Form.Label className="text-capitalize">due date</Form.Label>
                                    <Form.Control type="date" className="border-0 border-bottom create__input"
                                    name="dueDate" defaultValue={props.project.dueDate}
                                    onChange={(e)=>{
                                        setSingleProject({...singleProject,dueDate:e.target.value})
                                        setLoading(false)
                                    }}/>
                                </Form.Group> 
                            </div>
                        </Row>
                        <FormGroup className="mb-3" controlId="projectDescription">
                            <Form.Label className="text-capitalize">project description</Form.Label>
                            <Form.Control as="textarea" placeholder="project description" name="projectDesc"
                                className="border-0 border-bottom create__input" 
                                defaultValue={props.project.projectDesc}
                                onChange={(e)=>{
                                    setSingleProject({...singleProject,projectDesc:e.target.value})
                                    setLoading(false)
                                }}/>
                        </FormGroup>
                        <Form.Group as={Col} controlId="assignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control type="text" placeholder="Assignee" name="assignee"
                            className="border-0 border-bottom create__input" 
                            defaultValue={props.project.assignee}
                            onChange={(e)=>{
                                setSingleProject({...singleProject,assignee:e.target.value})
                                setLoading(false)
                            }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" 
                            className="mt-3 text-capitalize float-end"
                            disabled={loading}>
                            Update project 
                        </Button>
                    </Form>
                </Modal.Body>
           </Modal>  
        </>
    )
}

export default UpdateProjectDetails
