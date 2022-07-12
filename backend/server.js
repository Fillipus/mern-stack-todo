const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
const mongoose = require("mongoose");
 const PORT = 4000;

 //adding the routes
const router = require("./routes/todo");

app.use(cors());
 app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/todo_DB", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function() {
  console.log("mongoDB has connected successfully");
 });


app.use("/todos", router);

app.listen(PORT, function(){
  console.log("RESTFUL Server running on PORT: " + PORT);
 });
