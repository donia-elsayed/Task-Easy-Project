import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { useLocation } from 'react-router';
import UpdateTaskDetails from './UpdateTaskDetails';
import './task-details.scss'
import { tasksCollection } from '../../firebase';
function TaskDetails({show}) {
    const [modalShow, setModalShow] = useState(false);
    const [taskDetails, setTaskDetails] = useState([]);
    const location = useLocation();
    console.log(location.state)
    const singleTask = location.state.task.id;
    console.log(singleTask)
    
    const clickedTask = ()=> {
        tasksCollection.doc(singleTask).get()
        .then(taskDetail => setTaskDetails(taskDetail.data()));
    }
    
    console.log(taskDetails)
    useEffect(()=>{    
        clickedTask()
        console.log("new task")
    },[modalShow])
    useEffect(()=>{
        clickedTask()
    },[])
    return (
        <section className= {`task__details__section ${show ?"active-cont":""}`}>
            <Card className="task__details__card">
                <Card.Body>
                    <Card.Title><h3 className="text-center text-capitalize mb-4 update_task">Task Details</h3></Card.Title>
                    <Card.Text>
                        <strong className="fs-5 update_task">Task Name : </strong> 
                        <span>{taskDetails.taskName}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 update_task">Due Date: </strong>
                        <span>{taskDetails.dueDate}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 update_task">Task Description : </strong> 
                        <span>{taskDetails.taskDesc}</span>
                    </Card.Text>
                    <Card.Text>
                        <strong className="fs-5 update_task">Assignee : </strong>
                        <span>{taskDetails.assignee}</span>
                    </Card.Text>
                    <button type="submit" 
                    className="btn update__task__btn text-white d-flex justify-content-center w-auto m-auto mt-3"
                    onClick={() => setModalShow(true)}>
                    Update Task Details
                    </button>
                </Card.Body>
            </Card>
            <UpdateTaskDetails
                show={modalShow}
                onHide={() => setModalShow(false)}
                task={taskDetails}
                taskId={singleTask}
                className="modal__small"
                setModalShow={setModalShow}
            />
        </section>
    )
}

export default TaskDetails
