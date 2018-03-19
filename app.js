const express = require("express");
const app = express();

const todoController = require("./controllers/todoController");
const PORT = process.env.PORT || 3000;
//templating engine
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//fire controllers
todoController(app);

// listen
app.listen(PORT);
console.log(`Listening to port ${PORT}`);
