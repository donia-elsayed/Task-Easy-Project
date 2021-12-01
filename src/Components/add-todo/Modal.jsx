import { Modal,FormGroup, Row, Col, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import { tasksCollection } from "../../firebase";
function MydModalWithGrid(props) {
  console.log(props)
  const [taskData, setTaskData] = useState({
    taskName: "",
    dueDate: "",
    taskDesc: "",
    assignee: "",
    statusName: "Todo",
    projectId: props.projectid,
  });
  const initialValues = {
    taskName: "",
    dueDate: "",
    taskDesc: "",
    assignee: "",
    statusName: "Todo",
    // projectId: "",
  };

  // const [text, setText] = useState("");
  const validationSchema = yup.object({
    taskName: yup.string().required("Enter Title"),
  });
  const onSubmit = (values, state) => {
    tasksCollection.add(taskData);
    props.additem(state);
    setTaskData("");
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
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="text-capitalize"
        >
          Add Task
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="taskName"
            value={props.textval}
            onChange={props.changetext}
          >
            <Form.Label className="text-capitalize">Task Name</Form.Label>
            <Form.Control
              placeholder="Enter Task Name"
              name="taskName"
              value={taskData.taskName}
              onChange={(e) => {
                setTaskData({ ...taskData, taskName: e.target.value });
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              className="border-0 border-bottom create__input"
            />
          </Form.Group>
          {formik.touched.taskName && formik.errors.taskName && (
            <div className="text-danger mb-2">{formik.errors.taskName}</div>
          )}

          <Row className="mb-3">
            <div className="col-6">
              <Form.Group as={Col} controlId="dueDate">
                <Form.Label className="text-capitalize">due date</Form.Label>
                <Form.Control
                  type="date"
                  className="border-0 border-bottom create__input"
                  name="dueDate"
                  {...formik.getFieldProps("dueDate")}
                  value={taskData.dueDate}
                  onChange={(e) => {
                    setTaskData({ ...taskData, dueDate: e.target.value });
                    formik.handleChange(e);
                  }}
                  onBlur={formik.handleBlur}
                />
              </Form.Group>
              {formik.touched.dueDate && formik.errors.dueDate && (
                <div className="text-danger mt-2">{formik.errors.dueDate}</div>
              )}
            </div>
          </Row>
          <FormGroup className="mb-3" controlId="taskDescription">
            <Form.Label className="text-capitalize">
              Task Description
            </Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Task description"
              name="taskDesc"
              className="border-0 border-bottom create__input"
              value={taskData.taskDesc}
              onChange={(e) => {
                setTaskData({ ...taskData, taskDesc: e.target.value });
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            />
          </FormGroup>
          {formik.touched.taskDesc && formik.errors.taskDesc && (
            <div className="text-danger mb-2">{formik.errors.taskDesc}</div>
          )}
          <Form.Group as={Col} controlId="assignee">
            <Form.Label>Assignee</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Assignee"
              name="assignee"
              className="border-0 border-bottom create__input"
              value={taskData.assignee}
              onChange={(e) => {
                setTaskData({ ...taskData, assignee: e.target.value });
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
            />
          </Form.Group>
          {formik.touched.assignee && formik.errors.assignee && (
            <div className="text-danger mb-2">{formik.errors.assignee}</div>
          )}
          <Button
            variant="primary"
            type="submit"
            className="mt-3 text-capitalize float-end"
          >
            Create Task{" "}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
export default MydModalWithGrid;
