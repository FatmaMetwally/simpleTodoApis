const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.post('/todos', todoController.createTodo);
router.get('/todos', todoController.getTodos);
router.get('/todos/:id', todoController.getTodoById);
router.put('/todos/:id', todoController.updateTodo);
router.delete('/todos/:id', todoController.deleteTodo);
router.get('/todos/checked/:checked', todoController.getTodosByCheckedStatus);

module.exports = router;