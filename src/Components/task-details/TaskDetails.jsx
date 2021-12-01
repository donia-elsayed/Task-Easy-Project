import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router';
import UpdateTaskDetails from './UpdateTaskDetails';
import './task-details.scss'
function TaskDetails({show}) {
    const [modalShow, setModalShow] = useState(false);
    const location = useLocation();
    const singleTask = location.state.task
    return (
        <section className= {`task__details__section ${show ?"active-cont":""}`}>
            <Card className="task__details__card">
                <Card.Body>
                    <Card.Title><h3 className="text-center text-capitalize mb-4 text-info">Task Details</h3></Card.Title>
                    <Card.Text>
                        <strong className="fs-5 text-info">Task Name : </strong> 
                        <span>{singleTask.taskName}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Due Date: </strong>
                        <span>{singleTask.dueDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Task Description : </strong> 
                        <span>{singleTask.taskDesc}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 text-info">Assignee : </strong>
                        <span>{singleTask.assignee}</span>
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
                className="modal__small"
            />
        </section>
    )
}

export default TaskDetails
