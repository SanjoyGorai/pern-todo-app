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

app.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todos');
        res.json(allTodos.rows)
    } catch (error) {
        console.log(error);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const allTodos = await pool.query('SELECT * FROM todos WHERE todo_id = $1', [id]);
        res.json(allTodos.rows[0])
    } catch (error) {
        console.log(error.message);
    }
});

app.post('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { desctiption } = req.body;
        const updateTodos = await pool.query(
            'UPDATE todos SET desctiption = $1 WHERE todo_id = $2 ',
            [desctiption, id]);
        res.json('Todo updated')
    } catch (error) {
        console.log(error.message);
    }
});



app.get('/', (req, res) => res.send('Hello World from Express'));

app.listen(PORT, () => {
    console.log(`Express server listening on port http://localhost:${PORT} `);
});



// ()