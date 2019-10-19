import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const push = type => {
    store.dispatch({
      type: type,
    })
  }

  return (
    <div>
      <button onClick={() => push('GOOD')}>hyvä</button>
      <button onClick={() => push('OK')}>neutraali</button>
      <button onClick={() => push('BAD')}>huono</button>
      <button onClick={() => push('ZERO')}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
