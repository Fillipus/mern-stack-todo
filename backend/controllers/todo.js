const Todo = require("../todo.model");

//gets all todo begin
exports.getAllTodo = (req, res) => {
    Todo.find(function(err, todos) {
        if (err) {
          console.log(err);
          res.status(404).send("failed to add a todo");
        } else {
          res.json(todos);
        }
      });
};
//gets all todo ends


//gets single todo begin
exports.getSingleTodo = (req, res) => {
  let id = req.params.id;
  Todo.findById(id, function(err, todo) {
    if (err) {
      console.log(err);
    } else {
      res.json(todo);
    }
  });
};
//gets single todo ends


//adds todo begin
exports.postCreateTodo = (req, res) => {
    let todo = new Todo(req.body);
    todo.save((err, todo) => {
    if (err) {
      console.log(err);
      res.status(400).send("adding todo failed");
    } else {
      res.status(200).json({ todo: "todo added successfully" });
    }
  });
};
//adds todo ends

//update todo begins
exports.putUpdateTodo = (req, res) => {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo) {
          res.status(404).send("todo not found");
        } else {
          const {
            todoDesc,
            todoCompleted,
            todoResponsible,
            todoPriority
          } = req.body;
          todo.todoDesc = todoDesc;
          todo.todoCompleted = todoCompleted;
          todo.todoResponsible = todoResponsible;
          todo.todoPriority = todoPriority;
          todo.save((err, todo) => {
            if (err) {
              console.log(err);
              res.status(400).send("updating todo failed");
            } else {
              res.status(200).json({ todo: "todo updated" });
            }
          });
        }
      });
};
//update todo ends

//delete todo begins
exports.deleteTodo = (req, res) => {
    Todo.deleteOne({ _id: req.params.id }, err => {
        if (err) {
          console.log(err);
          res.status(400).send("deleting todo failed");
        } else {
          res.status(200).json({ todo: "todo deleted successfully" });
        }
      });
};
//delete todo ends
