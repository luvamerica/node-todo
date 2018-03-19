const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
//connect to db
mongoose.connect(
	"mongodb://test:test@ds119049.mlab.com:19049/todo-node-robert"
);

//create schema

let todoSchema = new mongoose.Schema({ item: String });

let Todo = mongoose.model("Todo", todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
	app.get("/todo", (req, res) => {
		//get data from mongo
		Todo.find({}, (err, data) => {
			if (err) throw err;
			res.render("todo", { todos: data });
		});
	});

	app.post("/todo", urlencodedParser, (req, res) => {
		//get data from view and post to mongodb
		let newTodo = Todo(req.body).save((err, data) => {
			if (err) throw err;
			res.json(data);
		});
	});

	app.delete("/todo/:item", (req, res) => {
		Todo.find({ item: req.params.item.replace(/\-/g, " ").trim() }).remove(
			(err, data) => {
				if (err) throw err;
				res.json(data);
			}
		);
	});
};
