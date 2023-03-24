import React from 'react'
import ReactDOM from 'react-dom/client'
import counterReducer from './reducer'
import { createStore } from 'redux'

const store = createStore(counterReducer)


const App = () => {
  return (
    <div>
      <div>
        <button onClick = {() => store.dispatch({ type: 'GOOD'})}>good</button>
        <button onClick = {() => store.dispatch({ type: 'OK'})}>ok</button>
        <button onClick = {() => store.dispatch({ type: 'BAD'})}>bad</button>
        <button onClick = {() => store.dispatch({ type: 'RESET'})}>reset stats</button>
        <div>good {store.getState().good}</div>
        <div>ok {store.getState().ok}</div>
        <div>bad {store.getState().bad}</div>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)