import _ from "lodash";
import React, { useState } from "react";
import "./Todo.css";
import {Button} from  "react-bootstrap";


import { Droppable, DragDropContext, Draggable } from "react-beautiful-dnd";
import {v4} from "uuid";
import MydModalWithGrid from "./Modal";

const item ={
  id:v4(),
  name:"clean the house"
}
const item2 ={
  id:v4(),
  name:"hello"
}
//drag and drop must be strings
console.log(item)
function Todo() {
//   const initialValues = {
//     task: "",
    
// };
  const [text, setText] = useState("")
  const [modalShow, setModalShow] = useState(false);
  const [state, setState] = useState({
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
  const handleDragEnd =({destination, source})=>{
    if (!destination) {
      return
    }

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
  }
    )}
    const addItem = () => {
   
      setState(prev => {
        return {
          ...prev,
          todo: {
            title: "Todo",
            items: [
              {
                id: v4(),
                name: text
              },
              ...prev.todo.items
            ]
          }
        }
      })
    
  
      setText("")
    }
  
  
  return (<>
  
  <div className="container">
    <div class = "w-100">
  
     </div>
    <div className={"todo"}>
      


      <MydModalWithGrid textval={text} show={modalShow} onHide={() => setModalShow(false) }add={addItem} changetext={(e) => setText(e.target.value)}
       >
        
         </MydModalWithGrid>
       
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key} className={"coloumn"}>
              <h3>{data.title}</h3>
           
              <Droppable droppableId={key}>
                {(provided , snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                      
                    >
                     
                      
                      {data.items.map((el , index )=> {
return(
  <Draggable key={el.id} index={index} draggableId={el.id} >
    {(provided , snapshot)=>{
      return(
        <div
        className={`item ${snapshot.isDragging && "dragging"}`}
      
        
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      
        
      >
        {el.name}
        
        </div>

      )
    }}
    
    </Draggable>
)
                      })}
                      {provided.placeholder}
                     
                    </div>
                  );
                }}
                
              </Droppable>
              {data.title ==="Todo" &&  (
                <Button variant="outline-danger" className = "mt-2 m-auto addDrop" onClick={() => setModalShow(true)}>
               + Add Task
                 </Button>)
        }
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
