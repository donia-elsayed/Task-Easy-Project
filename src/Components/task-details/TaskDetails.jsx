import { useState } from 'react'
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router';
import UpdateTaskDetails from './UpdateTaskDetails';

function TaskDetails() {
    const [modalShow, setModalShow] = useState(false);
    const location = useLocation();
    const singleTask = location.state.task
    return (
        <>
            <Card className="d-flex m-auto w-50 mt-5 rounded-3">
                <Card.Body>
                    <Card.Title><h3 className="text-center text-capitalize mb-4 text-info">Project Details</h3></Card.Title>
                    <Card.Text>
                    <strong className="fs-5 text-info">Task Name : </strong> {singleTask.taskName}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Due Date: </strong>{singleTask.dueDate}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Task Description : </strong> {singleTask.taskDesc}
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Assignee : </strong> {singleTask.assignee}
                    </Card.Text>
                    <button type="submit" 
                    className="btn btn-info text-white d-flex justify-content-center w-auto m-auto mt-3"
                    onClick={() => setModalShow(true)}>
                    Update Task Details
                    </button>
                </Card.Body>
            </Card>
            <UpdateTaskDetails
                show={modalShow}
                onHide={() => setModalShow(false)}
                task={singleTask}
            />
        </>
    )
}

export default TaskDetails
