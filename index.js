import express from 'express';
import cors from 'cors';
import pg from 'pg';
const { Client, Pool } = pg;

const app = express();
const PORT = process.env.PORT || 5000;


const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'sanjoypql',
    database: 'perntodo',
    port: 5432
});


app.use(cors());
app.use(express.json())

pool.query('SELECT NOW ()', (err, res) => {
    if (err) {
        console.error("Error connecting to PostgreSQL: ", err);
    } else {
        console.log('Connected to PostgreSQL:', res.rows[0].now);
    }
});

// pool.query();

app.post('/todos', async (req, res) => {
    try {
        const { desctiption } = req.body;
        const newTodo = await pool.query('INSERT INTO todos (desctiption) VALUES($1)', [desctiption]);
        res.json(newTodo.rows[0])
    } catch (error) {
        console.log(error);
    }
});

app.get('/todos', async(req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todos');
        res.json(allTodos.rows)
    } catch (error) {
        
    }
});

app.get('/', (req, res) => res.send('Hello World from Express'));

app.listen(PORT, () => {
    console.log(`Express server listening on port http://localhost:${PORT} `);
});



// ()