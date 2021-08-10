import React, { useState, useRef, useEffect, useCallback } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import apiService from "services/back";
import { MentionsInput, Mention } from "react-mentions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 800,
    marginTop: 20,
    marginLeft: "Auto",
    marginRight: "Auto",
  },
  textArea: {
    width: "90%",
    margin: "auto",
    height: 150,
  },
  atSuggestion:{
    backgroundColor:'black'
  },
  send: {
    margin: 20,
    float: "right",
  },
  title: {
    marginLeft: 40,
    marginBottom: 10,
    marginTop: 10,
  },
  limit: {
    marginRight: 40,
    float: "right",
    marginTop: 10
  },
  submit: {
    marginLeft: 40,
    marginTop: 10,
    marginBottom:10
  },
});

export default function Input() {
  const classes = useStyles();
  const buttonText = "Send";
  const UserName = localStorage.getItem("user");
  const [content, setContent] = useState("");
  const [id, setId] = useState(100);
  const [limit, setLimit] = useState(100);
  const [comment, setComment] = useState("");
  const [userList, setUserList] = useState([]);
  const userAPI = "https://c3120.herokuapp.com/user";

  const user = localStorage.getItem("user");

  const formHandler = (event) => {
    event.preventDefault();
    console.log("Form Submitted", "username: " + UserName);

    apiService
      .post(id + 1, UserName, content)
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Something went wrong:", error);
      });
    setId(id + 1);
  };
  useEffect(() => {
    fetch(userAPI)
      .then((res) => res.json())
      .then((x) => {
        if (user != null) {
          setUserList(x);
        }
      });
  }, []);

  return (
    <Card className={classes.root}>
      <form onSubmit={formHandler}>
        <div className="row">
          <div className="four columns">
            <Typography
              className={classes.title}
              variant="h4"
              htmlFor="username"
            >
              whats on ur mind
            </Typography>
            <MentionsInput
              className={classes.textArea}
              value={comment}
              maxLength={limit}
              onChange={(e) => {
                setContent(e.target.value);
                setComment(e.target.value);
              }}
            >
              <Mention trigger="@" markup="@__id__" data={userList} />
            </MentionsInput>
            <Typography variant="h6" className={classes.limit}>
              {content.length}/{limit}
            </Typography>
          </div>
            <Button
              className={classes.submit}
              color="primary"
              variant="contained"
              type="submit"
              value="submit"
            >Submit</Button>
        </div>
      </form>
    </Card>
  );
}
