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
});

app.get('/tasks/:id', async (req, res) => {
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

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});