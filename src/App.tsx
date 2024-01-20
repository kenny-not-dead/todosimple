import React from "react";
import classes from "./App.module.scss";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className={classes.App}>
      <TaskManager />
    </div>
  );
}

export default App;
