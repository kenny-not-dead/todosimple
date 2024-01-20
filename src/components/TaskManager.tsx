import React, { useEffect, useState } from "react";

import TodoList from "./ToDolist";
import AddItemForm from "./AddItemForm";
import classes from "./TaskManager.module.scss";
import { useAppSelector } from "../hooks/redux-hooks";
import { useDispatch } from "react-redux";
import {
  changeStatus,
  addNewTask,
  clearCompleted,
  deleteTask,
} from "../store/taskSlice";

export type FilterValuesType = "all" | "active" | "completed";

function TaskManager() {
  const taskList = useAppSelector((state) => state.task.tasks);

  // filter task

  let [filter, setFilter] = useState<FilterValuesType>("all");

  const changeFilter = (value: string) => {
    if (value === "all") {
      setFilter("all");
    } else if (value === "active") {
      setFilter("active");
    } else if (value === "completed") {
      setFilter("completed");
    }
  };

  // count task in progress

  const [listLength, setListLength] = useState(0);

  useEffect(() => {
    setListLength(taskList.filter((i: any) => i.completed === false).length);
  }, [taskList]);

  //actions

  const dispatch = useDispatch();

  const changeStatusHandler = (taskId: string) => {
    dispatch(changeStatus(taskId));
  };

  const addNewTaskHandler = (title: string) => {
    dispatch(addNewTask(title));
  };

  const clearCompletedHandler = () => {
    dispatch(clearCompleted(false));
  };

  const deleteTaskHandler = (id: string) => {
    dispatch(deleteTask(id));
  };

  const [showMore, setShowMore] = useState(false);

  const showList = () => {
    setShowMore(!showMore);
  };

  return (
    <div>
      <h1>Task manager</h1>
      <div className={classes.todowrapper}>
        <AddItemForm
          showMore={showMore}
          showList={showList}
          addNewTaskHandler={addNewTaskHandler}
        />
        {!showMore
          ? taskList
              .filter((i) => {
                if (filter === "active") {
                  return i.completed === false;
                } else if (filter === "completed") {
                  return i.completed === true;
                } else return i;
              })
              .map((el) => {
                return (
                  <TodoList
                    key={el.id}
                    id={el.id}
                    title={el.title}
                    completed={el.completed}
                    changeStatusHandler={changeStatusHandler}
                    deleteTaskHandler={deleteTaskHandler}
                  />
                );
              })
          : ""}

        <div className={classes.btnwrapper}>
          <p>
            {listLength === 0
              ? "Все задачи выполнены"
              : listLength + " нужно выполнить"}
          </p>
          <div>
            <button
              className={filter === "all" ? classes.btnActive : ""}
              onClick={() => {
                changeFilter("all");
              }}
            >
              Всё задачи
            </button>
            <button
              className={filter === "active" ? classes.btnActive : ""}
              onClick={() => {
                changeFilter("active");
              }}
            >
              Активные
            </button>
            <button
              className={filter === "completed" ? classes.btnActive : ""}
              onClick={() => {
                changeFilter("completed");
              }}
            >
              Выполненные
            </button>
          </div>
          <button onClick={clearCompletedHandler}>Очистить выполненные</button>
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
