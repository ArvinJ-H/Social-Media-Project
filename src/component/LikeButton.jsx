import React, { useEffect } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import apiService from "services/back";

const useStyles = makeStyles({
  text: {
    marginLeft: 10,
  },
  button: {
    paddingLeft: 0,
  },
});
export default function LikeButton({ id, likedList, user }) {
  const [selected, setSelected] = React.useState(false);

  const classes = useStyles();

  useEffect(() => {
    if (user != null) {
      if (likedList == null) {
        setSelected(false);
        likedList = [];
      } else if (likedList.includes(user)) {
        setSelected(true);
      }
    }
  }, []);

  const likeHandle = () => {
    if (selected) {
      likedList = likedList.filter((e) => e != user );
      apiService.handleLike(id, likedList);
    } else {
      if (!likedList.includes(user)) {
        likedList.push(user);
      }
        apiService.handleLike(id, likedList);
    }
    console.log(likedList)

  };

  return (
    <ToggleButton
      classes={{ selected: "bigRedButton" }}
      className={classes.button}
      value="check"
      disableRipple={true}
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
      onClick={likeHandle}
    >
      <FavoriteIcon />
      <Typography className={classes.text}>
        {selected ? `mua~` : "like me"}
      </Typography>
    </ToggleButton>
  );
}
