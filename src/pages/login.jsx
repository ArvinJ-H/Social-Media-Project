import React, { useState } from "react";
import SigninForm from "component/SigninForm";

const Login = () => {
  const [user, setUser] = useState(null);


  return <SigninForm user={user} setUser={setUser} />;
};

export default Login;
