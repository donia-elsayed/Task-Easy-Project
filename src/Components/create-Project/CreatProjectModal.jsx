import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import { Col,Form, FormGroup, Row } from 'react-bootstrap'
import { useFormik } from "formik"
import * as yup from "yup"
import { useRef, useState} from "react"
import './create-project.css'
import {projectsCollection} from '../../firebase'

function CreatProjectModal(props) {
    const projectNameRef  = useRef();
    const privacyRef = useRef();
    const startDateRef = useRef();
    const dueDateRef = useRef();
    const projectDescRef = useRef();
    const assigneeRef = useRef();
    const [projectData,setProjectData] = useState({
        projectName: "",
        privacy:"",
        startDate:"",
        dueDate:"",
        projectDesc: "",
        assignee:""
    })
    const initialValues = {
        projectName: "",
        privacy:"",
        startDate:"",
        dueDate:"",
        projectDesc: "",
        assignee:""
    };
    function handleSubmit(e,values) {
        console.log(values)
        e.preventDefault();
            projectsCollection.add({
            assignee:assigneeRef.current.value,
            dueDate:dueDateRef.current.value ,
            privacy:privacyRef.current.value ,
            projectDesc:projectDescRef.current.value ,
            projectName:projectNameRef.current.value,  
            startDate:startDateRef.current.value ,
        })
        
    }
    const validationSchema = yup.object({
        projectName: yup.string().required("projectName field is required")
    });
    const formik = useFormik({
        initialValues,
        validationSchema,
    });
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
                        create project
                    </Modal.Title>
                </Modal.Header>   
                <Modal.Body>
                    <Form onSubmit={(e,values)=>handleSubmit(e,values)}>
                        <Form.Group className="mb-3" controlId="projectName">
                            <Form.Label className="text-capitalize">project name</Form.Label>
                            <Form.Control placeholder="Enter Project Name" name="projectName"
                            {...formik.getFieldProps("projectName")} ref={projectNameRef}
                            className="border-0 border-bottom create__input"/>
                        </Form.Group>
                        {formik.touched.projectName && formik.errors.projectName &&(
                            <div className="text-danger mb-2">{formik.errors.projectName}</div>
                        )}
                        <Form.Group className="mb-3 d-flex" controlId="privacy">
                            <Form.Check type="radio" name="privacy" label="public" 
                            value="public" onChange={formik.handleChange}
                            defaultChecked={formik.values.privacy === "public"} />
                            <Form.Check type="radio" name="privacy" label="private" className="ms-3"
                             value="private" onChange={(e)=>{
                                 setProjectData(e.target.value)
                                formik.handleChange(e)
                             }} 
                             defaultChecked={formik.values.privacy === "private"}/>
                        </Form.Group>
                        <Row className="mb-3">
                            <Form.Group as={Col} controlId="startDate">
                                <Form.Label className="text-capitalize">start date</Form.Label>
                                <Form.Control type="date" className="border-0 border-bottom create__input"
                                name="startDate" {...formik.getFieldProps("startDate")} ref={startDateRef}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="dueDate">
                                <Form.Label className="text-capitalize">due date</Form.Label>
                                <Form.Control type="date" className="border-0 border-bottom create__input"
                                 name="dueDate" {...formik.getFieldProps("dueDate")} ref={dueDateRef}/>
                            </Form.Group>
                        </Row>
                        <FormGroup className="mb-3" controlId="projectDescription">
                            <Form.Label className="text-capitalize">project description</Form.Label>
                            <Form.Control as="textarea" placeholder="project description" name="projectDesc"
                            className="border-0 border-bottom create__input" {...formik.getFieldProps("projectDesc")}
                            ref={projectDescRef}/>
                        </FormGroup>
                        <Form.Group as={Col} controlId="assignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control type="text" placeholder="Assignee" name="assignee"
                            className="border-0 border-bottom create__input" {...formik.getFieldProps("assignee")}
                            ref={assigneeRef}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3 text-capitalize float-end">create project </Button>
                    </Form>
                </Modal.Body>
           </Modal> 
        </>
    )
}

export default CreatProjectModal
