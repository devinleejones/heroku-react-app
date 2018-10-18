import React, { Component, Fragment } from 'react'
import Todos from './todoList'
import TodoForm from './todoForm'

export default class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: []
    }
    this.addTodo = this.addTodo.bind(this)
    this.checkTodo = this.checkTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
  }

  addTodo(todo) {
    fetch('/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
      .then(response => response.json())
      .then(todo => {
        this.setState({ todos: [...this.state.todos, todo] })
      })
  }

  checkTodo(event) {
    const { todos } = this.state
    let todoId = event.target.closest('[id]').id
    todoId = parseInt(todoId, 10)
    const index = todos.findIndex(todo => todo.id === todoId)
    fetch(`/todos/${todoId}`, {
      method: 'PATCH',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isCompleted: !todos[index].isCompleted
      })
    })
      .then(res => res.json())
      .then(todo => {
        const before = todos.slice(0, index)
        const after = todos.slice(index + 1)
        this.setState({ todos: [...before, todo, ...after] })
      })
  }

  deleteTodo(event) {
    const { todos } = this.state
    let todoId = event.target.closest('[id]').id
    todoId = parseInt(todoId, 10)
    const index = todos.findIndex(todo => todo.id === todoId)
    fetch(`/todos/${todoId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        const before = todos.slice(0, index)
        const after = todos.slice(index + 1)
        this.setState({ todos: [...before, ...after] })
      })
  }

  componentDidMount() {
    fetch('/todos')
      .then(results => {
        return results.json()
      })
      .then(data => this.setState({ todos: data }))
  }
  render() {
    const { todos } = this.state
    const { addTodo, checkTodo, deleteTodo } = this
    return (
      <Fragment>
        <h1 className="text-center m-4">Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <Todos todos={todos} checkTodo={checkTodo} deleteTodo={deleteTodo} />
      </Fragment>
    )
  }
}
