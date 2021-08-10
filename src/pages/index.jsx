import React, { useState, useEffect } from "react";
import Twitts from "component/Twitts";
import InputArea from "component/Input";

const user = localStorage.getItem("user");
const id = localStorage.getItem("_id");

export default function Index() {
  const API = "https://c3120.herokuapp.com/post";
  const userAPI = "https://c3120.herokuapp.com/user";
  var thisUser = [];
  const [Posts, setPosts] = useState([]);
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    console.log('effect')
    fetch(API)
      .then((res) => res.json())
      .then((posts) => setPosts(posts));

    fetch(userAPI)
      .then((res) => res.json())
      .then((x) => {
        if (user != null) {
          thisUser = x.filter((d) => d.id === user);
          setFollowList(thisUser[0].follows);
          localStorage.setItem("follow", thisUser[0].follows);
        }
      });
  },[]);
  return (
    <div>
      <InputArea user={user} />
      <Twitts user={user} id={id} Posts={Posts} followList={followList}/>
    </div>
  );
}
