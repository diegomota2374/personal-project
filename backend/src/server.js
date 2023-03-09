const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const port = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  app.use(cors());
  next();
});

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.aqyy030.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port);
    console.log("conectado com sucesso");
  })
  .catch((error) => {
    console.log(error);
  });
