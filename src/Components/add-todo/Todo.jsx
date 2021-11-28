import _ from "lodash";
import React, { useState, useEffect } from "react";
import { Button} from "react-bootstrap";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { tasksCollection } from "../../firebase";
import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import MydModalWithGrid from "./Modal";
import { useLocation,useNavigate } from "react-router-dom";
import "./Todo.css";
//drag and drop must be strings

function Todo() {
  const navigate = useNavigate();
  const location = useLocation();
  const proj = location.state.projectId;
  const query = proj && tasksCollection.where("projectId", "==", proj);

  const [tasks] = useCollectionData(query, { idField: "id" });

  const [text, setText] = useState(tasks);
  const [modalShow, setModalShow] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [singleTask, setSingleTask] = useState({
    todo: {
      title: "Todo",
      items: [],
    },
    inprogress: {
      title: "Inprogress",
      items: [],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });
  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    // Creating a copy of item before removing it from state
    const itemCopy = { ...singleTask[source.droppableId].items[source.index] };
    console.log(itemCopy)
    tasksCollection.doc(itemCopy.id).update({
      ...itemCopy,
      statusName:
        destination.droppableId === "inprogress"
          ? "Inprogress"
          : destination.droppableId === "completed"
          ? "Completed"
          : "Todo",
    });
    // condition ? implem : condition2 ?implm :impl else
    setSingleTask((prev) => {
      prev = { ...prev };
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1);

      // Adding to new items array location
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };
  const addItem = () => {
    setSingleTask((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [
            {
              id: v4(),
              name: text,
              statusName: "Todo",
            },
            ...prev.todo.items,
          ],
        },
      };
    });

    setText("");
    setModalShow(false)
  };

  useEffect(() => {
    if (tasks) {
      setSingleTask({
        todo: {
          title: "Todo",
          items: [...tasks.filter((elem) => elem.statusName === "Todo")],
        },
        inprogress: {
          title: "Inprogress",
          items: [...tasks.filter((elem) => elem.statusName === "Inprogress")],
        },
        completed: {
          title: "Completed",
          items: [...tasks.filter((elem) => elem.statusName === "Completed")],
        },
      });
    }
  }, [tasks]);
  return (
    <>
      <div className="container">
        <div className="row todo mt-4 justify-content-lg-center justify-content-md-start">
          <MydModalWithGrid
              projectId={proj}
              textVal={text}
              show={modalShow}
              onHide={() => setModalShow(false)}
              add={addItem}
              changeText={(e) => setText(e.target.value)}
            ></MydModalWithGrid>
           
            <DragDropContext onDragEnd={handleDragEnd}>
              {_?.map(singleTask, (data, key) => {
                return (
                  <div key={key} className="col-lg-3 col-md-12 mb-5 drop__item__card" >
                    <h3>{data.title}</h3>

                    <Droppable droppableId={key}>
                      {(provided, snapshot) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={"droppable-col"}
                          >
                            {data.items.map((el, index) => {
                              return (
                                <Draggable
                                  key={el.id}
                                  index={index}
                                  draggableId={el.id}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        className={`item ${
                                          snapshot.isDragging && "dragging"
                                        }`}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        onClick={()=>{navigate('/task-Details',{state:{task:el}})
                                      }
                                        }
                                      >
                                        {el?.taskName}
                                      </div>
                                    );
                                  }}
                                   
                                </Draggable>
                               
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                    {data.title === "Todo" && (
                      <Button
                        variant="outline-danger"
                        className="mt-4 m-auto addDrop"
                        onClick={() => setModalShow(true)}
                      >
                        + Add Task
                      </Button>
                    )}
                  </div>
                );
              })}
            </DragDropContext>
        </div>
        
        
      </div>
    </>
  );
}

export default Todo;
