const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT id, project_name FROM projects');
        const response = {data: result.rows};
        res.json(response);
    } finally {
        client.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
})

app.get('/project/:id', async (req, res) => {
  try {
    const client = await pool.connect();
    try {
      const id = req.params.id;
      const result = await client.query('SELECT * FROM tasks WHERE project_id = $1', [id]);
      const response = { data: result.rows };
      res.json(response);
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.get('/name/:id', async (req, res) => {
  try {
    const client = await pool.connect();
    try {
      const id = req.params.id;
      const result = await client.query('SELECT project_name FROM projects WHERE id = $1', [id]);
      const project_name = result.rows.length > 0 ? result.rows[0].project_name : null
      if (typeof project_name === 'string') {
        res.send(project_name)
      } else {
        res.status(404).send("Project name not found")
      }
    } finally {
      client.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.post('/addtask', async(req, res) => {
  const { name, description, priority } = req.body
  const taskId = new Date()
  // const id = req.params.id;
  try {
    const result = await pool.query('INSERT INTO tasks (name, description, priority, project_id) VALUES ($1, $2, $3, $4) RETURNING *', [name, description, priority, taskId])
    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }

})


app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});