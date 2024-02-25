const Todo = require('../models/todoModel');

module.exports.createTodo = async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error with creating a Todo' });
  }
};

module.exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error with Getting Todos' });
 
  }
};

module.exports.getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: `Internal server error with getting a Todo with id :${id}` });
   }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const { title, body, checked } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, body, checked },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error with Updating a Todo' });
 
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error with deleting a Todo' });
 
  }
};
module.exports.getTodosByCheckedStatus = async (req, res) => {
    const checked = req.params.checked === 'true' ? true : req.params.checked === 'false' ? false : null;
    try {
      let todos;
      if (checked === null) {
        todos = await Todo.find();
      } else {
        todos = await Todo.find({ checked });
      }
      res.json(todos);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };