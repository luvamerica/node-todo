const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

let data = [
	{ item: "get milk" },
	{ item: "buy bananas" },
	{ item: "learn to code" }
];

module.exports = function(app) {
	app.get("/todo", (req, res) => {
		res.render("todo", { todos: data });
	});

	app.post("/todo", urlencodedParser, (req, res) => {
		data = [...data, req.body];
		res.json(data);
	});

	app.delete("/todo/:item", (req, res) => {
		data = data.filter(todo => {
			console.log(todo.item);
			console.log(req.params.item);
			return !req.params.item.includes(todo.item.replace(/ /g, "-"));
		});
		res.json(data);
	});
};
