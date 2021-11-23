import Modal from 'react-bootstrap/Modal'
import Button from "react-bootstrap/Button"
import { Col,Form, FormGroup, Row } from 'react-bootstrap'
import { useFormik } from "formik"
import * as yup from "yup"
import { useState} from "react"
import { v4 } from "uuid";
import {auth,projectsCollection} from '../../firebase'
import './create-project.css'

function CreatProjectModal(props) {
    const [projectData,setProjectData] = useState({
        projectName: "",
        privacy:"public",
        startDate:"",
        dueDate:"",
        projectDesc: "",
        assignee:"",
        id: v4(),
        userId: auth.currentUser.uid,
    })
    const initialValues = {
        projectName: "",
        privacy:"",
        startDate:"",
        dueDate:"",
        projectDesc: "",
        assignee:"",
        userId: ""
    };
    const onSubmit = () => {
        projectsCollection.add(projectData) 
        setProjectData("")
    };
    const validationSchema = yup.object({
        projectName: yup.string().required("projectName field is required"),
        startDate:yup.string().required("StartDate field is required"),
        dueDate:yup.string().required("DueDate field is required"),
        projectDesc: yup.string().required("project Description field is required"),
        assignee:yup.string().required("Assignee field is required")
    });
    const formik = useFormik({
        initialValues,
        onSubmit,
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
                {/* {error && <Alert variant="danger">{error}</Alert>}
                    {message && <Alert variant="success">{message}</Alert>}  */}
                <Modal.Body>
                    <Form onSubmit={formik.handleSubmit}>
                        <Form.Group className="mb-3" controlId="projectName">
                            <Form.Label className="text-capitalize">project name</Form.Label>
                            <Form.Control placeholder="Enter Project Name" name="projectName"
                            value={projectData.projectName}
                            onChange={(e)=>{
                              setProjectData({...projectData,projectName:e.target.value})
                              formik.handleChange(e)
                            }}
                            onBlur={formik.handleBlur}
                            className="border-0 border-bottom create__input"/>
                        </Form.Group>
                        {formik.touched.projectName && formik.errors.projectName &&(
                            <div className="text-danger mb-2">{formik.errors.projectName}</div>
                        )}
                        <Form.Group className="mb-3 d-flex" controlId="privacy">
                            <Form.Check type="radio" name="privacy" label="public" 
                             value={projectData.privacy}
                             onChange={(e)=>{
                                 setProjectData({...projectData,privacy:e.target.value})
                                formik.handleChange(e)
                             }}
                             onBlur={formik.handleBlur} 
                            
                            />
                        <Form.Check type="radio" name="privacy" label="private" className="ms-3"
                            value={projectData.privacy}
                            onChange={(e)=>{
                                setProjectData({...projectData,privacy:e.target.value})
                                formik.handleChange(e)
                            
                            }}
                            
                            />
                        </Form.Group>
                        <Row className="mb-3">
                            <div className="col-6">
                                <Form.Group as={Col} controlId="startDate">
                                    <Form.Label className="text-capitalize">start date</Form.Label>
                                    <Form.Control type="date" className="border-0 border-bottom create__input"
                                    name="startDate"  
                                    value={projectData.startDate}
                                    onChange={(e)=>{
                                        setProjectData({...projectData,startDate:e.target.value})
                                        formik.handleChange(e)
                                    }}
                                    onBlur={formik.handleBlur}
                                    />
                                </Form.Group>
                                {formik.touched.startDate && formik.errors.startDate &&(
                                    <div className="text-danger mt-2">{formik.errors.startDate}</div>
                                )}
                            </div>
                           <div className="col-6">
                            <Form.Group as={Col} controlId="dueDate">
                                    <Form.Label className="text-capitalize">due date</Form.Label>
                                    <Form.Control type="date" className="border-0 border-bottom create__input"
                                    name="dueDate" {...formik.getFieldProps("dueDate")} 
                                    value={projectData.dueDate}
                                    onChange={(e)=>{
                                        setProjectData({...projectData,dueDate:e.target.value})
                                        formik.handleChange(e)
                                    }}
                                    onBlur={formik.handleBlur}
                                    />
                                </Form.Group>
                                {formik.touched.dueDate && formik.errors.dueDate &&(
                                    <div className="text-danger mt-2">{formik.errors.dueDate}</div>
                                )}
                           </div>
                            
                        </Row>
                        <FormGroup className="mb-3" controlId="projectDescription">
                            <Form.Label className="text-capitalize">project description</Form.Label>
                            <Form.Control as="textarea" placeholder="project description" name="projectDesc"
                            className="border-0 border-bottom create__input" value={projectData.projectDesc}
                            onChange={(e)=>{
                                setProjectData({...projectData,projectDesc:e.target.value})
                                formik.handleChange(e)
                            }}
                             onBlur={formik.handleBlur}/>
                        </FormGroup>
                        {formik.touched.projectDesc && formik.errors.projectDesc &&(
                            <div className="text-danger mb-2">{formik.errors.projectDesc}</div>
                        )}
                        <Form.Group as={Col} controlId="assignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control type="text" placeholder="Assignee" name="assignee"
                            className="border-0 border-bottom create__input" 
                            value={projectData.assignee}
                            onChange={(e)=>{
                                setProjectData({...projectData,assignee:e.target.value})
                                formik.handleChange(e)
                            }}
                             onBlur={formik.handleBlur}/>
                        </Form.Group>
                        {formik.touched.assignee && formik.errors.assignee &&(
                            <div className="text-danger mb-2">{formik.errors.assignee}</div>
                        )}
                        <Button variant="primary" type="submit" className="mt-3 text-capitalize float-end">create project </Button>
                    </Form>
                </Modal.Body>
           </Modal> 
        </>
    )
}

export default CreatProjectModal
