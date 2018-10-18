import React from 'react'
import { ListGroup, ListGroupItem, Input } from 'reactstrap'

export default function Todos(props) {
  const todos = props.todos
  const checkTodo = props.checkTodo
  const deleteTodo = props.deleteTodo
  const listtodos = todos.map(todo => {
    return (
      <ListGroupItem key={todo.id}>
        <div>
          <Input
            addon
            id={todo.id}
            onClick={checkTodo}
            className="mx-2"
            type="checkbox"
          />
          {todo.task}
          {todo.isCompleted && (
            <i
              id={todo.id}
              onClick={deleteTodo}
              className="fas fa-times fa-lg float-right mt-1"
            />
          )}
        </div>
      </ListGroupItem>
    )
  })
  return (
    <div className="justify-content-center d-flex">
      <ListGroup className="w-50">{listtodos}</ListGroup>
    </div>
  )
}
