import React from "react";
import classes from "./TodoList.module.scss";
import { Checkbox } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { green } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";

type PropsType = {
  id: string;
  title: string;
  completed: boolean;
  changeStatusHandler: (taskId: string) => void;
  deleteTaskHandler: (id: string) => void;
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TodoList(props: PropsType) {
  const onChangeStatusHandler = () => {
    props.changeStatusHandler(props.id);
  };

  const deleteTaskHandler = () => {
    props.deleteTaskHandler(props.id);
  };

  return (
    <li className={classes.wrapper}>
      <div className={classes.checkboxwrapper}>
        <Checkbox
          {...label}
          icon={<PanoramaFishEyeIcon color="disabled" />}
          checkedIcon={<CheckCircleOutlineIcon sx={{ color: green[500] }} />}
          onChange={onChangeStatusHandler}
          checked={props.completed}
        />
      </div>
      <div className={classes.titlewrapper}>
        <p className={props.completed ? classes.completed : classes.inprogress}>
          {props.title}
        </p>
      </div>

      <button className={classes.btnDelete} onClick={deleteTaskHandler}>
        <DeleteIcon color="primary" />
      </button>
    </li>
  );
}
