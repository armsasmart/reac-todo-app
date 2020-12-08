import axios from 'axios'

const API_URL = 'http://127.0.0.1:3000/api/todos/'

async function getTodos() {
  const { data: { data: todos } } = await axios.get(API_URL);
  return todos
}

async function createTodo(message) {
  const { data: { data: todo } } = await axios.post(API_URL, {
    message
  })
  return todo
}

async function updateTodo(id, payload) {
  const { data: { data: todo } } = await axios.put(`${API_URL}${id}`, payload)
  return todo
}

async function deleteTodo(id) {
  await axios.delete(`${API_URL}${id}`)
}

export default { getTodos, createTodo, updateTodo, deleteTodo }
