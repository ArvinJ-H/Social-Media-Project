import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function NavBar(userName) {
  const classes = useStyles();
  let history = useHistory();
  const routeChange = () => {
    history.push("/login");
  };
  const goHome = () => {
    history.push("/");
  };

  const goProfile =()=>{
    history.push('/user/'+userName.user)
  }

  if (userName.user == null) {
    console.log('it is null')
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} onClick={goHome}>
              Home
            </Typography>
            <Button color="inherit" onClick={routeChange}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    console.log('user is here' , userName)
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title} onClick={goHome}>
              Home
            </Typography>
            <Button color="inherit" onClick={goProfile}>
              {userName.user}
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
