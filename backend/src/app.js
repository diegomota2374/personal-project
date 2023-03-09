require("dotenv").config();
const express = require("express");
const router = require("./router");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to the API!" });
});

module.exports = app;
