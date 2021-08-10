const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("./DB/index");
const fetch = require("node-fetch");
const User = require("./model/user");
const Posts = require("./model/posts");

const apiRouter = express.Router();
var list = [];
const SECRET = "secret";
const saltRounds = 10;

/**
 * validate a token and return a decoded token or null if invalid
 * @param {express.request} req
 * @returns {jwt.token} a decoded jwt token
 */


apiRouter.post("/posts", async (req, res) => {
  const post = new Posts({
    id: req.body.id,
    user: req.body.user,
    content: req.body.content,
  });
  try {
    const savedPosts = await post.save();
    res.send(savedPosts);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .find({ id: username })
      .toArray((err, result) => {
        if (!err) {
          list = result;
          resolve(result);
        } else {
          res.status(500).send(err.message);
        }
      });
  });
};

apiRouter.post("/register", async (req, res) => {
  var newPassword = ''
  try{
    const newPassword = await bcrypt.hash(req.body.password,saltRounds)
    const user = new User({
      id: req.body.id,
      password: newPassword,
    });
    const savedUser = await user.save();
    res.send(savedUser);

  }catch(err){
    console.log('errrrr')
    res.status(500).send('password might be wrong')
  }
  
});
// handle post request for login with {username, password}

apiRouter.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  getUser(username).then(async (x) => {
    if (x.size == 0) {
      return res.status(401).json({ error: "invalid username or password" });
    }
    try{
      if ( await bcrypt.compare(password , x[0].password)) {
        console.log("Password is good!");
        const userForToken = {
          _id: x[0]._id,
          name: username,
          avatar: x[0].avatar,
          follow: x[0].follows,
        };
        const token = jwt.sign(userForToken, SECRET);
  
        return res.status(200).json({
          token,
          _id: x[0]._id,
          name: username,
          avatar: x[0].avatar,
          follow: x[0].follows,
        });
      } else {
        return res.status(401).json({ error: "invalid username or password" });
      }
    }catch(err){
      return res.status(401).json({ error: "invalid username or password" });
    }
    
  });
});

apiRouter.get("/", async (req, res) => {
  res.status(200).send("/user or /post");
});

apiRouter.route("/user").get(async (req, res) => {
  db.collection("users")
    .find({})
    .toArray((err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send(err.message);
      }
    });
});

apiRouter.route("/user/:userId").get(async (req, res) => {
  try {
    console.log("here");
    getUser(req.params.userId).then((x) => {
      console.log(x);
      res.status(200).send(x);
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

apiRouter.route("/post").get(async (req, res) => {
  db.collection("posts")
    .find({})
    .toArray((err, result) => {
      if (!err) {
        res.status(200).send(result);
      } else {
        res.status(500).send(err.message);
      }
    });
});

apiRouter.get("/:postId", async (req, res) => {
  try {
    const post = await Posts.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});
apiRouter.delete("/delete/:postId", async (req, res) => {
  try {
    const delteThis = await Posts.remove({ _id: req.params.postId });
    res.json(delteThis);
  } catch (err) {
    res.json({ message: err });
  }
});
apiRouter.patch("/posts/:postId", async (req, res) => {
  try {
    console.log(req.body);
    const updateLike = await Posts.updateOne(
      { _id: req.params.postId },
      { $set: { likes: req.body.likeList } }
    );
    res.json(updateLike);
  } catch (err) {
    res.json({ message: err });
  }
});

apiRouter.patch("/users/:userId", async (req, res) => {
  try {
    const updateFollow = await User.updateOne(
      { _id: req.params.userId },
      { $set: { follows: req.body.followList } }
    );
    res.json(updateFollow);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = apiRouter;
