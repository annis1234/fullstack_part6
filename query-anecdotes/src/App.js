import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getAnecdotes, update } from './requests'
import { useReducer } from 'react'
import  NotificationReducer from './reducers/NotificationReducer'
import NotificationContext from './NotificationContext'

const App = () => {

  const [notification, notificationDispatch] = useReducer(NotificationReducer)

  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation(update, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {

    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `you voted for ${anecdote.content}`
    })
    setTimeout(() => {
      notificationDispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, 5000)
    
  }

 const res = useQuery('anecdotes', getAnecdotes, {retry: false}
 )

 if ( res.isLoading ){
  return <div>loading data...</div>
 }

 if(res.isError) {
  return <div>anecdote service not available due to problems in server</div>
 }

 const anecdotes = res.data

  return (
    <NotificationContext.Provider value = {[notification, notificationDispatch]}>
      <div>
      <h3>Anecdote app</h3>
    
      <Notification message = {notification}/>
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
    </NotificationContext.Provider>
  )
}

export default App
