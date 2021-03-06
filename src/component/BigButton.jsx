import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function BigButton(props) {
  return (
      <Button className={props.classes} variant="contained" color="primary">
        {props.text}
      </Button>
  );
}
