import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import apiService from "services/back";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from '@material-ui/core/Modal';


import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  card: {
    width: "fit-content",
    margin: "auto",
    marginTop: "5%",
  },
  cardContent:{
    margin:10
  },
  input: {
    margin: "auto",
    width: 200,
    display: "block",
    marginTop: 10,
  },
  buttonGroup: {
    width: "fit-content",
    margin: "auto",
  },
  buttons: {
    margin: 20,
  },
});

function getModalStyle() {
  const top = '50%' ;
  const left = '50%' ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    backgroundColor:'white',
    border: 'none'
  };
}

export default function SigninForm({ user, setUser }) {
  let history = useHistory();
  const classes = useStyles();

  const API = "https://c3120.herokuapp.com/user";
  const userList = localStorage.getItem("user");
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const [UserName, setUserName] = useState("");
  const [PassWord, setPassWord] = useState("");
  const [login, setLogin] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Congratulations !!!</h2>
      <p id="simple-modal-description">
        Hi {UserName}, good to see you here. There is not turning back from here, click anyway to close this and click log to start posting.
      </p>
    </div>
  );
  useEffect(() => {
    fetch(API).then((res) => res.json());
  }, []);

  const formHandler = (event) => {
    event.preventDefault();
    console.log(
      "Form Submitted",
      "username: " + UserName,
      "pasword " + PassWord
    );
    if (login) {
      apiService
        .login(UserName, PassWord)
        .then((data) => {
          console.log("Success:", data);
          localStorage.setItem("user", data.name);
          localStorage.setItem("avatar", data.avatar);
          localStorage.setItem("follow", JSON.stringify(data.follow));
          localStorage.setItem("_id", data._id);
          setUser(data.name);
          window.location.reload();
        })
        .catch((error) => {
          console.log("Something went wrong:", error);
        });
      history.push("/");
    } else {
      apiService
        .register(UserName, PassWord)
        .then((data) => {
          console.log("yes ", data);
          console.log("registered as " + UserName);
          setOpen(true)
        })
        .catch((err) => console.log("regi failed: ", err));
    }
  };

  if (userList != null) {
    setUser(userList);
    return (
      <div className="row">
        <div className="eight columns">
          <p>Logged in {user}</p>
        </div>
        <div className="four columns">
          <button
            onClick={() => {
              setUser(null);
              localStorage.clear();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <form onSubmit={formHandler}>
            <div className="row">
              <div className="four columns">
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label="User Name"
                  variant="outlined"
                  type="text"
                  name="username"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="four columns">
                <TextField
                  className={classes.input}
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  name="password"
                  type="password"
                  onChange={(e) => setPassWord(e.target.value)}
                />
              </div>
              <div className={classes.buttonGroup}>
                <Button
                  className={classes.buttons}
                  color="primary"
                  variant="contained"
                  type="submit"
                  value="Login"
                  onClick={() => setLogin(true)}
                >
                  login
                </Button>
                <Button
                  className={classes.buttons}
                  color="primary"
                  variant="contained"
                  type="submit"
                  value="sign up"
                  onClick={() => setLogin(false)}
                >
                  signup
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    );
  }
}
