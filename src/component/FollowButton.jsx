import React, { useEffect } from "react";
import MailIcon from "@material-ui/icons/Mail";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import apiService from "services/back";

const useStyles = makeStyles({
  text: {
    marginLeft: 10,
  },
});
export default function FollowButton({ id, user, followList }) {
  const [selected, setSelected] = React.useState(false);
  const classes = useStyles();
  const currentUser = localStorage.getItem("user");
  if(localStorage.getItem("follow") != null){
    followList = localStorage.getItem("follow").split(",");
  }
  useEffect(() => {
    if (currentUser != null) {
      if (followList.includes(user)) {
        setSelected(true);
      }
    }
  }, []);

  const followHandle = () => {
    if (selected) {
      followList = followList.filter((e) => e !== user);
      localStorage.setItem("follow", followList);
      apiService.handleFollow(id, followList);
    } else {
      if (!followList.includes(user)) {
        followList.push(user);
        localStorage.setItem("follow", followList);
      }
      apiService.handleFollow(id, followList);
    }
    console.log(followList);
  };

  return (
    <ToggleButton
      classes={{ selected: "bigBlueButton" }}
      value="check"
      disableRipple={true}
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={followHandle}
    >
      <MailIcon />
      <Typography className={classes.text}>
        {selected ? `following` : "follow"}
      </Typography>
    </ToggleButton>
  );
}
