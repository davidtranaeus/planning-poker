import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './TaskForm.css'

let TaskForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">Add a task to the queue</label>
      <Field name="task" component="input" type="text" />
      <button className="button--unpressed" type="submit">Submit</button>
    </form>
  )
}

TaskForm = reduxForm({
  form: 'task'
})(TaskForm)

export default TaskForm