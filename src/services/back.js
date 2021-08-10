import axios from "axios";
const baseURL = "/api/";

/**
 * Get a list of all unitsfrom the api
 * @return {Promise}    Promise that will resolve to the response data
 */


/**
 * Send a login request
 * @param {Object} param0 {username, password}
 * @returns {Promise} Promise that will resolve to the response data
 */

const post = (id, user, content) => {
  console.log("going through");
  return axios
    .post("https://c3120.herokuapp.com/posts", { id, user, content })
    .then((response) => response.data)
    .then((response) => console.log("response " + response));
};

const handleLike = (id, likeList) => {
  return axios.patch("https://c3120.herokuapp.com/posts/" + id, { id, likeList });
};

const handleFollow = (id, followList) => {
  console.log("id should be string " + id);
  console.log("follow user is " + followList);
  return axios.patch("https://c3120.herokuapp.com/users/" + id, { id, followList });
};

const login = (username, password) => {
  console.log("POST", baseURL + "login");
  console.log("the username " + username);
  return axios
    .post("https://c3120.herokuapp.com/api/login", { username, password })
    .then((response) => response.data);
};

const register = (id, password) => {

  console.log("regi id is " + id);
  console.log("regi pass is " + password);
  return axios
    .post("https://c3120.herokuapp.com/register/", { id, password })
    .then((respon) => respon.data);
};

const handleDelete = (_id) => {
  console.log("deleting " + _id);
  return axios
    .delete("https://c3120.herokuapp.com/delete/" + _id, { _id })
    .then((respon) => respon.data);
};

const getUserInfo = (username) => {
  console.log("getting user info: " + username);
  return axios
    .get("https://c3120.herokuapp.com/user/" + username, { username })
    .then((response) => response.data);
};

export default {
  login,
  post,
  handleLike,
  handleFollow,
  register,
  handleDelete,
  getUserInfo
};
