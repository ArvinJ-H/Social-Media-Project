import React, { useState, useEffect } from "react";
import Twitts from "component/Twitts";

export default function HashPage() {
  const API = "https://c3120.herokuapp.com/post";
  const user = localStorage.getItem("user");
  const id = localStorage.getItem("_id");
  const [allPost, setAllPost] = useState([]);
  var hashPost = [];
  var thisUser = [];

  const [hashTag, setHashTag] = useState("");
  const [followList, setFollowList] = useState([]);
  const userAPI = "https://c3120.herokuapp.com/user";

  const addHash = (hash) => {
    return "#" + hash;
  };
  useEffect(() => {
    var url = window.location.href;
    url = url.split("/");
    setHashTag(url[url.length - 1]);

    fetch(API)
      .then((res) => res.json())
      .then((posts) => setAllPost(posts));

    fetch(userAPI)
      .then((res) => res.json())
      .then((x) => {
        if (user != null) {
          thisUser = x.filter((d) => d.id === user);
          setFollowList(thisUser[0].follows);
          localStorage.setItem("follow", thisUser[0].follows);
        }
      });
  }, []);
  if (allPost.length > 0) {
    allPost.map((post) => {
      if (post.content.includes(addHash(hashTag))) {
        console.log(post.content);
        hashPost.push(post);
      }
    });
  }

  return (
    <Twitts user={user} id={id} Posts={hashPost} followList={followList} />
  );
}
