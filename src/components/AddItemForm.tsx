import { TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classes from "./AddItemForm.module.scss";
import { IconButton } from "@mui/material";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { createSvgIcon } from "@mui/material/utils";

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

type AddItemFormType = {
  addNewTaskHandler: (title: string) => void;
  showMore: boolean;
  showList: Function;
};

function AddItemForm(props: AddItemFormType) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const onNewInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setError(false);
    setInputValue(e.currentTarget.value);
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && inputValue.trim() !== "") {
      props.addNewTaskHandler(inputValue);
      setInputValue("");
    } else if (e.code === "Enter" && inputValue.trim() === "") {
      setError(true);
    }
  };

  const addTask = () => {
    if (inputValue.trim() === "") {
      setError(true);
      return;
    }
    props.addNewTaskHandler(inputValue.trim());
    setInputValue("");
  };

  const showList = () => {
    props.showList();
  };

  return (
    <div>
      <div className={classes.wrapper}>
        {props.showMore ? (
          <ExpandLessIcon className={classes.chevron} onClick={showList} />
        ) : (
          <ExpandMoreIcon className={classes.chevron} onClick={showList} />
        )}
        <div>
          <TextField
            fullWidth
            sx={{ m: 1 }}
            label="Новая задача?"
            variant="standard"
            value={inputValue}
            onChange={onNewInputValue}
            onKeyUp={onKeyUpHandler}
            error={!!error}
          />
          <div className={classes.btnaddwrapper}>
            <IconButton onClick={addTask}>
              <PlusIcon color="primary" fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
      <p className={classes.error}>{error ? "Введите текст!" : ""}</p>
    </div>
  );
}

export default AddItemForm;
