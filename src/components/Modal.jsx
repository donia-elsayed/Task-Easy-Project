import { Modal , Container,FormGroup , Row , Col , Button , } from "react-bootstrap";
import React, { useState , useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Form from 'react-bootstrap/Form'
import { InputGroup } from "react-bootstrap";

function MydModalWithGrid(props) {
  const privacyRef = useRef();
const startDateRef= useRef();
const dueDateRef = useRef();
const projectDescRef = useRef();
const assigneeRef  = useRef();
  const initialValues = {
    title: "",
    
};

    const [text, setText] = useState("")
    const validationSchema = yup.object({
      title: yup.string()
           .required("Enter Title"),
     
   });
   const onSubmit = (values,{resetForm} , state) => {
 
    resetForm({values:''});
    props.add(state)
  };
   
  
     const formik = useFormik({
       initialValues,
       onSubmit,
       validationSchema,
   });

    return (



      



<Modal
{...props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
<Modal.Header closeButton>
    <Modal.Title id="contained-modal-title-vcenter" className="text-capitalize">
       Add Task
    </Modal.Title>
</Modal.Header>   
<Modal.Body>
    <Form onSubmit= {formik.handleSubmit}>
    <Form.Group className="mb-3"value={props.textval} onChange={props.changetext}  controlId="formBasicEmail">
                             <Form.Label>Enter Title</Form.Label>
                             <InputGroup>
                              
                                 <Form.Control type="title" placeholder="Enter title" 
                                        name="title"
                                     {...formik.getFieldProps("title")}>
                                 </Form.Control>
                            </InputGroup>
                         </Form.Group>
                         {formik.touched.title && formik.errors.title && (
                         <div style={{ color: "red"}}>{formik.errors.title}</div>
                        )}
        <Form.Group className="mb-3 d-flex" controlId="privacy">
            <Form.Check type="radio" name="privacy" label="public" 
            value="public" onChange={formik.handleChange}
            defaultChecked={formik.values.privacy === "public"} ref={privacyRef}/>
            <Form.Check type="radio" name="privacy" label="private" className="ms-3"
             value="private" onChange={formik.handleChange} ref={privacyRef}
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
    );
  }
  export default MydModalWithGrid