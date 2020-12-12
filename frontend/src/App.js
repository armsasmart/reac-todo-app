import React, { useState, useEffect } from 'react';
import APIHelper from './APIHelper';

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [updateMessage, setUpdateMessage] = useState('')

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await APIHelper.getTodos()
      setTodos(todos)
    }
    fetchTodos().then(r => {
    })
  }, [])

  const createTodo = async (e) => {
    e.preventDefault()
    if (!todo) {
      setErrorMessage('please enter something')
      return
    }

    if (todos.some(({ message }) => message === todo)) {
      setErrorMessage(`${todo} already exists`)
      return
    }

    const newTodo = await APIHelper.createTodo(todo)
    notifyUser('Added new Todo.')
    setErrorMessage('')
    setTodo('')
    setTodos([...todos, newTodo])

  }

  const updateTodo = async (e, id) => {
    e.stopPropagation()
    const payload = {
      completed: !todos.find(({ _id: i }) => i === id).completed
    }
    const updateTodo = await APIHelper.updateTodo(id, payload)
    notifyUser('Updated Todo.')
    setTodos(todos.map(todo => todo._id === id ? updateTodo : todo))
  }

  const deleteTodo = async (e, id) => {
    e.stopPropagation()
    await APIHelper.deleteTodo(id)
    notifyUser('Removed Todo!')
    setTodos(todos.filter(({ _id: i }) => i !== id))
  }

  const notifyUser = message => {
    setUpdateMessage(message)
    setTimeout(() => {
      setUpdateMessage('')
    }, 2000);
  };

  return (
    <div className="m-4 p-4 text-center border border-teal-600">
      <h1 className="text-2xl text-gray-700">React Todo App</h1>
      {updateMessage && (
        <span
          className={`${
            updateMessage.includes("Removed")
              ? "text-red-600"
              : "text-teal-600"
          } mt-3 mb-3 inline-block`}
        >
            {updateMessage}
          </span>
      )}
      <div className="mt-3">
        {errorMessage && <p className="mt-2 mb-2 text-red-600">{errorMessage}</p>}
        <form
        >
          <div className="flex justify-center">
            <input
              className="border border-teal-600 px-2 py-1 focus: outline-none"
              type="text"
              value={todo}
              onChange={({ target }) => setTodo(target.value)}
            />
            <button
              onClick={createTodo}
              className="ml-2 px-2 py-1 border border-teal-600 text-white bg-teal-600 focus:outline-none hover:bg-teal-500"
            >
              <div className="flex items-center">
              <span className="inline-block text-white">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path
                    d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
                </svg>
              </span>
                <span className="inline-block ml-1">Add Todo</span>
              </div>
            </button>
          </div>
        </form>
      </div>
      <div className="mt-4">
        {todos.map(({ _id, message, completed }) => (
          <div className="mt-2 flex items-center justify-center" key={_id}>
                     <input
                      id={_id}
                      type="checkbox"
                      onClick={e => updateTodo(e, _id)}
                      checked={completed ? 'checked' : ''}
                      onChange={() => {
                      }}
                      className="mr-2 form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
              <span>{completed ? <strike>{message}</strike> : message}</span>
              <div className="flex">
                <span className="text-red-600 ml-4">
                  <svg
                    onClick={e => deleteTodo(e, _id)}
                    className="h-4 w-4 fill-current cursor-pointer"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z"/>
                  </svg>
                </span>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
