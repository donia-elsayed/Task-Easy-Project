import logo from './logo.svg';
import './App.css';
import _ from "lodash";
import React, { useState } from "react";
// import DndContext from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { DndContext } from "react-dnd";
import Todo from './components/Todo';
function App() {
 
  return (
   
   <Todo/>
   
  );
}

export default App;
