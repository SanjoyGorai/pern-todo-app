import express from 'express';
import pg from 'pg';
const { Client, Pool } = pg;

const app = express();
const PORT = process.env.PORT || 5000;


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'sanjoypql',
    database: 'todo',
    port: 5432
});


pool.query('SELECT NOW ()', (err, res) => {
    if (err) {
        console.error("Error connecting to PostgreSQL: ", err);
    } else {
        console.log('Connected to PostgreSQL:', res.rows[0].now);
    }
});

app.get('/', (req, res) => res.send('Hello World'));

app.listen(PORT, () => {
    console.log(`Express server listening on port http://localhost:${PORT} `);
});



// ()