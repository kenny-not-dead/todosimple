import React, { ChangeEvent } from "react";
import classes from "./TodoList.module.scss";
import { Checkbox } from "@mui/material";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { green } from "@mui/material/colors";

type PropsType = {
  id: string;
  title: string;
  completed: boolean;
  changeStatus: (taskId: string, isDone: boolean) => void;
};

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function TodoList(props: PropsType) {
  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    props.changeStatus(props.id, e.currentTarget.checked);
  };
  return (
    <li className={classes.wrapper}>
      <Checkbox
        {...label}
        icon={<PanoramaFishEyeIcon color="disabled" />}
        checkedIcon={<CheckCircleOutlineIcon sx={{ color: green[500] }} />}
        onChange={onChangeStatusHandler}
        checked={props.completed}
      />

      <h3 className={props.completed ? classes.completed : ""}>
        {props.title}
      </h3>
    </li>
  );
}
