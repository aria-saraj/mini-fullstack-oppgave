import { useEffect, useState } from 'react';
const API = 'http://localhost:4000/api/todos';

export default function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const res = await fetch(API);
                if (!res.ok) throw new Error('Kunne ikke hente todos');
                setTodos(await res.json());
            } catch (e) {
                setError(String(e.message || e));
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function addTodo(e) {
        e.preventDefault();
        if (!text.trim()) return;
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        if (res.ok) {
            const todo = await res.json();
            setTodos(p => [...p, todo]);
            setText('');
        }
    }

    async function toggleDone(id, done) {
        const res = await fetch(`${API}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done })
        });
        if (res.ok) {
            const updated = await res.json();
            setTodos(p => p.map(t => (t.id === updated.id ? updated : t)));
        }
    }

    async function removeTodo(id) {
        const res = await fetch(`${API}/${id}`, { method: 'DELETE' });
        if (res.status === 204) setTodos(p => p.filter(t => t.id !== id));
    }

    return (
        <div style={{ maxWidth: 520, margin: '40px auto', fontFamily: 'system-ui, sans-serif' }}>
            <h1 style={{ marginBottom: 8 }}>Todo</h1>

            <form onSubmit={addTodo} style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Skriv ny oppgave…"
                    style={{ flex: 1, padding: 8, borderRadius: 8, border: '1px solid #ddd' }}
                />
                <button style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #ddd', cursor: 'pointer' }}>
                    Legg til
                </button>
            </form>

            {loading && <p>Laster…</p>}
            {error && <p style={{ color: 'crimson' }}>{error}</p>}

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                {todos.map(t => (
                    <li key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: 8, border: '1px solid #eee', borderRadius: 8 }}>
                        <input type="checkbox" checked={t.done} onChange={e => toggleDone(t.id, e.target.checked)} />
                        <span style={{ flex: 1, textDecoration: t.done ? 'line-through' : 'none', color: t.done ? '#999' : '#222' }}>
              {t.text}
            </span>
                        <button onClick={() => removeTodo(t.id)} style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid #eee' }}>
                            Slett
                        </button>
                    </li>
                ))}
            </ul>

            <p style={{ marginTop: 16, color: '#666' }}>{todos.filter(t => !t.done).length} gjenstår</p>
        </div>
    );
}
