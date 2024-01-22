const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

app.use(cors());

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ProjectManager',
    password: 'Sze_55gf',
    port: 5432
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

const name = 'Name from backend';
const qwe = 'qwes dghf vbnm juyh  56478 bfghjk';

app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT id, project_name FROM projects');
        const response = {data: result.rows};
        // const response = name 
        res.json(response);
    } finally {
        client.release();
    }
  } catch (error) {
    res.status(500).json({ message: error.message});
  }
});

app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});