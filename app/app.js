const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// ======================================================
//  VARIABLES D'ENVIRONNEMENT (compatibles Kubernetes)
// ======================================================

const {
  DB_HOST = "postgres",
  DB_PORT = 5432,
  DB_USER = "todo_suer", // valeur du secret-base64
  DB_PASSWORD = "TodnPass123!Mh",
  DB_NAME = "todo_db",
} = process.env;

console.log("Configuration PostgreSQL :");
console.log("   HOST:", DB_HOST);
console.log("   PORT:", DB_PORT);
console.log("   USER:", DB_USER);
console.log("   DB NAME:", DB_NAME);

// ======================================================
//  CONNEXION À POSTGRESQL
// ======================================================

const pool = new Pool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// ======================================================
//  INITIALISATION DE LA TABLE TODOS
// ======================================================

async function initDb() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      task TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false
    );
  `;

  await pool.query(createTableQuery);
  console.log("Table 'todos' OK (créée ou déjà existante)");
}

// ======================================================
//  ROUTES DE L'API
// ======================================================

// GET /todos
app.get("/todos", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, task, done FROM todos ORDER BY id;");
    res.json({
      message: "Liste des tâches",
      count: result.rowCount,
      data: result.rows,
    });
  } catch (err) {
    console.error("Erreur GET /todos :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// POST /todos
app.post("/todos", async (req, res) => {
  try {
    const { task } = req.body;

    if (!task) {
      return res.status(400).json({ error: "Le champ 'task' est obligatoire" });
    }

    const result = await pool.query(
      "INSERT INTO todos (task, done) VALUES ($1, $2) RETURNING id, task, done;",
      [task, false]
    );

    res.status(201).json({
      message: "Tâche créée",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur POST /todos :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// PUT /todos/:id/done
app.put("/todos/:id/done", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "UPDATE todos SET done = true WHERE id = $1 RETURNING id, task, done;",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.json({
      message: "Tâche marquée comme terminée",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur PUT /todos/:id/done :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    const result = await pool.query(
      "DELETE FROM todos WHERE id = $1 RETURNING id, task, done;",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tâche non trouvée" });
    }

    res.json({
      message: "Tâche supprimée",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur DELETE /todos/:id :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// ======================================================
//  LANCEMENT DU SERVEUR
// ======================================================

const PORT = 3000;

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `API Running on port ${PORT} — connectée à PostgreSQL (${DB_HOST}:${DB_PORT})`
      );
    });
  })
  .catch((err) => {
    console.error("Erreur lors de l'initialisation de la base :", err);
    process.exit(1);
  });