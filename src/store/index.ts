import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';


const rootReducer = combineReducers({ task: taskReducer});

export const store = configureStore({
	reducer: rootReducer,
	preloadedState:loadFromLocalStorage()
	
});

function saveToLocalStorage(state: any){

    try{
      const serialState = JSON.stringify(state)
      localStorage.setItem("TaskManager",serialState)
    }catch(e){
      console.warn(e);
    }
  }
  
  function loadFromLocalStorage(){

    try{
      const serialisedState = localStorage.getItem("TaskManager");
      if(serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    }catch(e){
      console.warn(e);
      return undefined;
    }
  }

  store.subscribe(()=>saveToLocalStorage(store.getState()));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
