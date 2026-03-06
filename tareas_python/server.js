// Importacion de librerias

const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());



//Conexion a postgreSQL

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Tarea1",
  password: "Gyoutube16",
  port: 5432,
});

/*Endpoint: Obtener tareas
Metodo: GET
Ruta: /tareas
DEvuelve tareas almacenadas en la base de datos
*/
app.get("/tareas", async (req, res) => {
  const result = await pool.query("SELECT * FROM tareas");
  res.json(result.rows);
});




/*Endpoint: Crear tarea
Metodo: POST
Ruta: /tareas
REcibe un titulo y lo guarda en la base de datos
*/
app.post("/tareas", async (req, res) => {
  const { titulo } = req.body;

  const result = await pool.query(
    "INSERT INTO tareas (titulo) VALUES ($1) RETURNING *",
    [titulo]
  );

  res.json(result.rows[0]);
});




/*
Endpoint: Elimina una tarea
Método: DELETE
Ruta: /tareas/:id
Elimina una tarea según su ID
*/
app.delete("/tareas/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM tareas WHERE id=$1", [id]);

  res.json({ mensaje: "tarea eliminada" });
});

/*
Endpoint: Actualiza una tarea existente
Método: PUT
Ruta: /tareas/:id
Permite modificar el título de una tarea
*/
app.put("/tareas/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo } = req.body;

  const result = await pool.query(
    "UPDATE tareas SET titulo=$1 WHERE id=$2 RETURNING *",
    [titulo, id]
  );

  res.json(result.rows[0]);
});


//Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
