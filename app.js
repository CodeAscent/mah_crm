require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const UserRouter = require("./route/user");
const app = express();
const port = 3000;
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => console.log("connected to db"))
  .catch((e) => console.log(e));
app.get("/", (req, res) => res.send("Hello World!"));
app.use(UserRouter);
app.listen(port, () => console.log(`app listening on port ${port}!`));
