const express = require("express");
const app = express();
app.use(express.json());

// Fake DB for now — replaced later with PostgreSQL
let todos = [
  { id: 1, task: "Préparer le projet DevSecOps", done: false },
  { id: 2, task: "Créer l'image Docker", done: true }
];

// ➜ GET all todos
app.get("/todos", (req, res) => {
  res.json({
    message: "Liste des tâches",
    count: todos.length,
    data: todos
  });
});

// ➜ POST create a new todo
app.post("/todos", (req, res) => {
  const { task } = req.body;
  const newTodo = {
    id: todos.length + 1,
    task,
    done: false
  };
  todos.push(newTodo);

  res.status(201).json({
    message: "Tâche créée",
    data: newTodo
  });
});

// ➜ PUT mark as done
app.put("/todos/:id/done", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo)
    return res.status(404).json({ error: "Tâche non trouvée" });

  todo.done = true;

  res.json({
    message: "Tâche complétée",
    data: todo
  });
});

// ➜ DELETE remove a task
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1)
    return res.status(404).json({ error: "Tâche non trouvée" });

  const deleted = todos.splice(index, 1);

  res.json({
    message: "Tâche supprimée",
    data: deleted[0]
  });
});

// Server
app.listen(3000, () => console.log("API Running on port 3000"));