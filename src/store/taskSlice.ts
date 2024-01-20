import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";


const initialState = {
  tasks: [
  { id: uuid(), title: "Тестовое задание", completed: true },
  { id: uuid(), title: "Собеседование", completed: false },
  { id: uuid(), title: "Оффер", completed: false }
  ]
}  



const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {

    addNewTask: (state, action) => {
      state.tasks.push({id: uuid(), title: action.payload, completed: false} );
    },
    changeStatus: (state, action) => {
      const task = state.tasks.find(item => item.id === action.payload)
      if(task) task.completed = !task.completed;    
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(e =>  e.id !== action.payload)
    },
    clearCompleted: (state, action) => {
       state.tasks = state.tasks.filter(e =>  e.completed === action.payload)
    }
  },
});

export const { changeStatus, addNewTask, deleteTask, clearCompleted } = taskSlice.actions;
export default taskSlice.reducer;

