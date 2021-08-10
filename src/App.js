import React from "react";
import "style/style.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import index from "pages/index";
import NavBar from "component/NavBar";
import login from "pages/login";
import userPage from'pages/userPage'
import hashPage from'pages/hashPage'

const App = () => {
  const user = localStorage.getItem("user");

  return (
    <div className="App">
      <Router>
        <NavBar user={user} />
        <Route path="/" exact component={index} />
        <Route path="/login" exact component={login} />
        <Route path='/user/:userId' exact component={userPage}/>
        <Route path='/hashTag/:hashId' exact component={hashPage}/>
      </Router>
    </div>
  );
};

export default App;
