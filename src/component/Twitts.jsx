import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LikeButton from "./LikeButton";
import FollowButton from "./FollowButton";
import DeleteButton from "./DeleteButton";
import apiService from "services/back";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 800,
    marginTop: 20,
    marginLeft: "Auto",
    marginRight: "Auto",
  },
  title: {
    fontSize: 14,
    display: "inline-block",
    paddingLeft: 10,
    verticalAlign: "middle",
  },
  pos: {
    float: "right",
    marginBottom: 5,
  },
  content: {
    marginTop: 20,
    marginBottom: 20,
  },
  avatar: {
    display: "inline-flex",
  },
  delete: {
    float: "right",
  },
});

export default function Twitts({ user, id, Posts, followList }) {
  const classes = useStyles();

  let history = useHistory();

  const handleDelete = (_id) => {
    console.log("delte" + _id);
    apiService.handleDelete(_id).then((data) => {
      console.log("success: ", data);
      window.location.reload();
    });
  };

  const removeAt = (user) => {
    return user.replace("@", "");
  };
  const removeHash = (hash) => {
    return hash.replace("#", "");
  };

  const contentParts = (content) => {
    const array = content.split(" ");

    return array.map((e) => {
      let type = "text";
      if (e.startsWith("@")) {
        type = "mention";
      } else if (e.startsWith("#")) {
        type = "hashTag";
      }

      return {
        type,
        content: e,
      };
    });
  };

  const pushHashtagRoute = (hashtag) => {
    history.push("/hashTag/" + hashtag);
  };

  const pushUserRoute = (user) => {
    history.push("/user/" + user);
  };

  if (user != undefined) {
    return (
      <div>
        {Posts.map((post) => (
          <Card className={classes.root} key={post.id}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {post.user}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {post.timestamp}
              </Typography>
              <Typography
                className={classes.content}
                variant="h5"
                component="h2"
              >
                {contentParts(post.content).map((content) => {
                  if (content.type == "hashTag") {
                    return (
                      <span>
                        <a id='hashHandle'
                          onClick={() =>
                            pushHashtagRoute(removeHash(content.content))
                          }
                        >
                          {content.content}
                        </a>{" "}
                      </span>
                    );
                  } else if (content.type == "mention") {
                    return (
                      <span>
                        <a id='atHandle'
                          onClick={() =>
                            pushUserRoute(removeAt(content.content))
                          }
                        >
                          {content.content}
                        </a>{" "}
                      </span>
                    );
                  } else {
                    return content.content + " ";
                  }
                })}
              </Typography>
              <LikeButton id={post._id} likedList={post.likes} user={user} />
              <FollowButton id={id} user={post.user} followList={followList} />
              <div
                className={classes.delete}
                onClick={() => handleDelete(post._id)}
              >
                <DeleteButton />
              </div>
            </CardContent>
          </Card>
        )).reverse()}
      </div>
    );
  } else {
    if (Posts[Posts.length - 1] != undefined) {
      var post = Posts[Posts.length - 1];
      return (
        <div>
          <Card className={classes.root} key={post.id}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                {post.user}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {post.timestamp}
              </Typography>
              <Typography
                className={classes.content}
                variant="h5"
                component="h2"
              >
                {contentParts(post.content).map((content) => {
                  if (content.type == "hashTag") {
                    return (
                      <span>
                        <a
                          onClick={() =>
                            pushHashtagRoute(removeHash(content.content))
                          }
                        >
                          {content.content}
                        </a>{" "}
                      </span>
                    );
                  } else if (content.type == "mention") {
                    return (
                      <span>
                        <a
                          onClick={() =>
                            pushUserRoute(removeAt(content.content))
                          }
                        >
                          {content.content}
                        </a>{" "}
                      </span>
                    );
                  } else {
                    return content.content + " ";
                  }
                })}
              </Typography>
              
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return <p>Nothing to see here</p>;
    }
  }
}
