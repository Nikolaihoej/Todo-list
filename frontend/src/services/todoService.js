export async function fetchTodos() {
  const res = await fetch('http://localhost:5000/todos')
  return await res.json()
}

export async function addTodo(text) {
  const res = await fetch('http://localhost:5000/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, completed: false })
  })
  return await res.json()
}

export async function updateTodo(id, updates) {
  const res = await fetch(`http://localhost:5000/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  })
  return await res.json()
}

export async function removeTodo(id) {
  const res = await fetch(`http://localhost:5000/todos/${id}`, { method: 'DELETE' })
  return res
}