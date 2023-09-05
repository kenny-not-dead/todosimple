import React, { useEffect, useState } from "react";
import classes from "./App.module.scss";

import uuid from "react-uuid";
import TodoList from "./ToDolist";
import AddItemForm from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  completed: boolean;
};

function App() {
  let [filter, setFilter] = useState<FilterValuesType>("all");

  const [listLength, setListLength] = useState(0);

  let [tasks, setTasks] = useState<Array<TodoListType>>([
    { id: uuid(), title: "Тестовое задание", completed: false },
    { id: uuid(), title: "Прекрасный код", completed: true },
    { id: uuid(), title: "Покрытие тестами", completed: false },
    { id: uuid(), title: "Пригласить на собеседование", completed: true },
    { id: uuid(), title: "Предложить offer", completed: false },
  ]);

  let [filterTasks, setFilterTasks] = useState<Array<TodoListType>>(tasks);

  useEffect(() => {
    setListLength(tasks.filter((i: any) => i.completed === false).length);
    if (filter === "active") {
      setFilterTasks(tasks.filter((t) => t.completed === false));
    } else if (filter === "completed") {
      setFilterTasks(tasks.filter((t) => t.completed === true));
    } else setFilterTasks(tasks);
    return;
  }, [setFilterTasks, filter, tasks]);

  const changeStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = isDone;
      setTasks([...tasks]);
    }
  };

  const changeFilter = (value: string) => {
    if (value === "all") {
      setFilter("all");
    } else if (value === "active") {
      setFilter("active");
    } else if (value === "completed") {
      setFilter("completed");
    }
  };

  let addTodoList = (title: string) => {
    let todolist: TodoListType = { id: uuid(), title: title, completed: false };
    setTasks([...tasks, todolist]);
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((e) => e.completed === false));
  };

  const [showMore, setShowMore] = useState(false);

  const showList = () => {
    setShowMore(!showMore);
  };

  return (
    <div className={classes.App}>
      <h1>todos</h1>
      <div className={classes.todowrapper}>
        <AddItemForm
          showMore={showMore}
          showList={showList}
          addItem={(title: string) => {
            addTodoList(title);
          }}
        />
        {!showMore
          ? filterTasks.map((el) => {
              return (
                <TodoList
                  key={el.id}
                  id={el.id}
                  title={el.title}
                  completed={el.completed}
                  changeStatus={changeStatus}
                />
              );
            })
          : ""}

        <div className={classes.btnwrapper}>
          <p>{listLength === 0 ? "No" : listLength} items left</p>
          <div>
            <button
              className={filter === "all" ? classes.btnActive : ""}
              onClick={() => {
                changeFilter("all");
              }}
            >
              All
            </button>
            <button
              className={filter === "active" ? classes.btnActive : ""}
              onClick={() => {
                changeFilter("active");
              }}
            >
              Active
            </button>
            <button
              className={filter === "completed" ? classes.btnActive : ""}
              onClick={() => {
                changeFilter("completed");
              }}
            >
              Completed
            </button>
          </div>
          <button onClick={clearCompleted}>Clear completed</button>
        </div>
      </div>
    </div>
  );
}

export default App;
