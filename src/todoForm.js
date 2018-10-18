import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

export default class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.createTodo = this.createTodo.bind(this)
  }
  createTodo(event) {
    event.preventDefault()
    const formData = new FormData(event.target)
    const body = {
      task: formData.get('todo'),
      isCompleted: false
    }
    this.props.addTodo(body)
    event.target.reset()
  }
  render() {
    const { createTodo } = this
    return (
      <div className="justify-content-center d-flex mb-4">
        <Form onSubmit={createTodo} inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="todo" className="mr-sm-2" />
            <Input
              type="todo"
              name="todo"
              id="todo"
              placeholder="What to do?"
            />
          </FormGroup>
          <Button className="btn btn-dark">Add</Button>
        </Form>
      </div>
    )
  }
}
