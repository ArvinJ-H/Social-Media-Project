import React, { useState, useEffect } from "react";
import apiService from "services/back";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 100,
    width: 100,
    margin: "auto",
    display: "inline-block",
  },
  content: {
    display: "inline-block",
  },
  card: {
    width: "80%",
    margin: "auto",
    marginTop: "5%",
  },
  logout:{
    float:'right'
  }
});
export default function UserPage() {
  let history = useHistory();
  const classes = useStyles();

  const user = localStorage.getItem("user");
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    var url = window.location.href;
    var last = "";
    url = url.split("/");
    last = url[url.length - 1];

    apiService.getUserInfo(last).then((res) => setUserInfo(res[0]));
  }, []);

  if (userInfo != null) {
    const currentUser = userInfo.id;
    const avatar = userInfo.avatar;
    const followList = userInfo.follows;
    if (user == currentUser) {
      return (
        <Card className={classes.card}>
          <CardMedia className={classes.media} image={avatar} />
          <CardContent className={classes.content}>
            <Typography variant="h4"> {currentUser}</Typography>
            <Typography>Following: {followList}</Typography>
          </CardContent>

          <Button
            color="secondary"
            variant="contained"
            className={classes.logout}
            onClick={() => {
              localStorage.clear();
              history.push("/");
              window.location.reload();
            }}
          >
            Logout
          </Button>
        </Card>
      );
    } else {
      return (
        <Card>
          <img src={avatar} alt="" />
          <p> I am {currentUser}</p>
          <p>Following {followList}</p>
        </Card>
      );
    }
  } else {
    return (
      <Card>
        <p>Unauthorised User detected</p>
      </Card>
    );
  }
}
