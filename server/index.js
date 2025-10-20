const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let todos = [
    { id: 1, text: 'Lær React', done: false },
    { id: 2, text: 'Lag et lite API', done: true }
];
let nextId = 3;

app.get('/api/todos', (req, res) => res.json(todos));
app.post('/api/todos', (req, res) => {
    const { text } = req.body || {};
    if (!text || !text.trim()) return res.status(400).json({ error: 'Feltet "text" er påkrevd' });
    const todo = { id: nextId++, text: text.trim(), done: false };
    todos.push(todo);
    res.status(201).json(todo);
});
app.patch('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const t = todos.find(x => x.id === id);
    if (!t) return res.sendStatus(404);
    const { text, done } = req.body || {};
    if (typeof text === 'string') t.text = text;
    if (typeof done === 'boolean') t.done = done;
    res.json(t);
});
app.delete('/api/todos/:id', (req, res) => {
    const id = Number(req.params.id);
    const before = todos.length;
    todos = todos.filter(x => x.id !== id);
    if (todos.length === before) return res.sendStatus(404);
    res.sendStatus(204);
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server kjører på http://localhost:${port}`));

app.get('/', (_, res) => res.send('OK – API kjører. Se /api/todos'));

