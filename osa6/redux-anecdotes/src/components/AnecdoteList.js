import React from 'react'
import { addVotes } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'
import { connect } from 'react-redux'

const vote = (anecdote, props) => {
  console.log('vote', anecdote)
  props.addVotes(anecdote)
  props.setNotification(`You voted ${anecdote.content}`, 3)
}

const AnecdoteList = props => {
  return (
    <div>
      {props.anecdotesToShow.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote, props)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const filterAnecdotes = ({ filter, anecdotes }) => {
  const filteredAnecdotes = anecdotes.filter(anecdote =>
    anecdote.content.toLowerCase().match(filter.toLowerCase())
  )

  const compare = (a, b) => (a.votes < b.votes ? -1 : a.votes > b.votes ? 1 : 0)
  filteredAnecdotes.sort(compare)

  return filteredAnecdotes
}

const mapStateToProps = state => {
  console.log(state)
  return {
    anecdotesToShow: filterAnecdotes(state),
  }
}

const mapDispatchToProps = {
  addVotes,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
