const express = require("express");
const app = express();

const todoController = require("./controllers/todoController");

//templating engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controllers
todoController(app);

// listen
app.listen(3000);
console.log("Listening to port 3000");
