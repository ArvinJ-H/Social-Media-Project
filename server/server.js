const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const apiRouter = require("./api")

const db = require("./DB/index");
const { response } = require("express");
require('dotenv').config()


const app = express();
const apiPort = process.env.PORT ||3001;

// var users = [];
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use(apiRouter)
app.use(express.json())


app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));

