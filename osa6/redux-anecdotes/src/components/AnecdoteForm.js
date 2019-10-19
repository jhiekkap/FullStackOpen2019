import React from 'react'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const addAnecdote = async e => {
    e.preventDefault()
    const content = e.target.anecdote.value
    console.log('new anecdote: ', content)
    e.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNotification(`You created ${content}`, 3)
  }
 
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
