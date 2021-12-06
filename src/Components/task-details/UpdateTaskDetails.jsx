import React, { useEffect, useState } from 'react'
import { Alert, Col, Form, FormGroup, Modal} from 'react-bootstrap'
import Button from "react-bootstrap/Button"
import { tasksCollection } from '../../firebase'
import './task-details.scss'
function UpdateTaskDetails(props,task) {
    const [docId,setDocId] = useState(props.task.id)
    const [error,setError] = useState("")
    const [loading,setLoading] = useState(true)
    const [message,setMessage]= useState('')

    const [taskData,setTaskData] = useState({
        taskName:"",
        dueDate:"",
        taskDesc:"",
        assignee:""
    })
    async function handleSubmit(e){
        e.preventDefault()
        try{
            setError('')
            setMessage('')
            setLoading(true)
            await tasksCollection.doc(docId).update(taskData)
            setMessage("Updated Successfully")
        }
        catch{
            setError('Failed To Update Task')
        }
    }
    useEffect(()=>{
        setTaskData(task)     
    },[task])
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
                       Update Task Details
                    </Modal.Title>
                </Modal.Header>  
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                {message && <Alert variant="success" className="text-center">{message}</Alert>} 
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="projectName">
                            <Form.Label className="text-capitalize">Task Name</Form.Label>
                            <Form.Control placeholder="Enter Task Name" name="taskName"
                               className="border-0 border-bottom create__input"
                               defaultValue={props.task.taskName}
                               onChange={(e)=>{setTaskData({...taskData,taskName:e.target.value})
                               setLoading(false)
                               }}
                               />
                        </Form.Group>
                        <Form.Group as={Col} controlId="dueDate">
                            <Form.Label className="text-capitalize">due date</Form.Label>
                            <Form.Control type="date" className="border-0 border-bottom create__input"
                            name="dueDate" defaultValue={props.task.dueDate}
                            onChange={(e)=>{
                                setTaskData({...taskData,dueDate:e.target.value})
                                setLoading(false)
                            }}
                            />
                        </Form.Group>
                        <FormGroup className="mb-3" controlId="projectDescription">
                            <Form.Label className="text-capitalize">project description</Form.Label>
                            <Form.Control as="textarea" placeholder="Enter Task description" name="projectDesc"
                                className="border-0 border-bottom create__input" 
                                defaultValue={props.task.taskDesc}
                                onChange={(e)=>{
                                    setTaskData({...taskData,taskDesc:e.target.value})
                                    setLoading(false)
                                }}
                            />
                        </FormGroup>
                        
                        <Form.Group as={Col} controlId="assignee">
                            <Form.Label>Assignee</Form.Label>
                            <Form.Control type="text" placeholder="Enter Assignee" name="assignee"
                                className="border-0 border-bottom create__input" 
                                defaultValue={props.task.assignee}
                                onChange={(e)=>{
                                    setTaskData({...taskData,assignee:e.target.value})
                                    setLoading(false)
                                }}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" 
                            className="mt-3 text-capitalize float-end"
                            disabled={loading}>
                            Update Task
                        </Button>
                    </Form>
                </Modal.Body>
           </Modal> 
        </>
    )
}

export default UpdateTaskDetails
