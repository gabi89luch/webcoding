import { useEffect, useState, useMemo } from "react";

const STORAGE_KEY = "react-todo-items";
const FILTERS = { all: "All", active: "Active", completed: "Completed" };

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const visible = useMemo(() => {
    if (filter === "active") return todos.filter(t => !t.done);
    if (filter === "completed") return todos.filter(t => t.done);
    return todos;
  }, [todos, filter]);

  const remaining = todos.filter(t => !t.done).length;

  function addTodo(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setTodos(prev => [...prev, { id: crypto.randomUUID(), text, done: false }]);
    setDraft("");
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function removeTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.done));
  }

  return (
    <main className="app">
      <header>
        <h1>Todos</h1>
        <p className="lead">A reactive todo list built with React 18 and Vite.</p>
      </header>

      <form onSubmit={addTodo} className="add-form">
        <input
          type="text"
          value={draft}
          onChange={e => setDraft(e.target.value)}
          placeholder="What needs doing?"
          aria-label="New todo"
        />
        <button type="submit" className="primary">Add</button>
      </form>

      <div className="toolbar">
        <span className="count">{remaining} {remaining === 1 ? "item" : "items"} left</span>
        <div className="filters" role="tablist">
          {Object.entries(FILTERS).map(([key, label]) => (
            <button
              key={key}
              role="tab"
              aria-selected={filter === key}
              className={filter === key ? "active" : ""}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
        <button onClick={clearCompleted} className="ghost">Clear completed</button>
      </div>

      <ul className="todo-list">
        {visible.length === 0 && (
          <li className="empty">{todos.length === 0 ? "Nothing yet — add your first todo." : "Nothing here."}</li>
        )}
        {visible.map(t => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(t.id)}
              />
              <span>{t.text}</span>
            </label>
            <button className="delete" onClick={() => removeTodo(t.id)} aria-label={`Delete ${t.text}`}>
              ×
            </button>
          </li>
        ))}
      </ul>

      <footer>
        <p>State persists in <code>localStorage</code>. Try refreshing.</p>
      </footer>
    </main>
  );
}
