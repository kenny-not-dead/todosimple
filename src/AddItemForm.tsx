import { TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import classes from "./AddItemForm.module.scss";
import { IconButton } from "@mui/material";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

type AddItemFormType = {
  addItem: Function;
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
      props.addItem(inputValue);
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
    props.addItem(inputValue.trim());
    setInputValue("");
  };

  const showList = () => {
    props.showList();
  };
  return (
    <div className={classes.wrapper}>
      {props.showMore ? (
        <ExpandLessIcon className={classes.chevron} onClick={showList} />
      ) : (
        <ExpandMoreIcon className={classes.chevron} onClick={showList} />
      )}
      <div>
        <TextField
          label="What needs to be done?"
          variant="standard"
          value={inputValue}
          onChange={onNewInputValue}
          onKeyUp={onKeyUpHandler}
          error={!!error}
        />
        <div className={classes.btnaddwrapper}>
          <IconButton onClick={addTask}>
            <AddBoxSharpIcon color="primary" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default AddItemForm;
