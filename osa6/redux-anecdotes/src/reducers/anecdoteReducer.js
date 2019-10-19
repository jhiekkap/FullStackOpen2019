/* const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  } 
} */

//const initialState = anecdotesAtStart.map(asObject)

import anecdoteService from './../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  console.log('anecdote state now: ', state)
  console.log('anecdote action', action)
  switch (action.type) {
    case 'VOTE':
      const votedAnecdote = action.data
      const id = votedAnecdote.id
      return state.map(anecdote =>
        anecdote.id === id ? votedAnecdote : anecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVotes = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote,
    })
  }
}

export default anecdoteReducer
