import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { handleNotification } from '../reducers/notificationReducer'


const AnecdoteList = () =>{
    const dispatch = useDispatch()

    const anecdotes = useSelector(state=> {
        if ( state.filter === 'ALL') {
            return state.anecdotes
        }
        return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    })
    

    const vote = (id, content) => {
        dispatch(voteAnecdote(id))

        dispatch(handleNotification(`you voted ${content}`, 5))
        }

  const anecdotesToSort = [...anecdotes]
  const sorted = anecdotesToSort.sort((a,b) => b.votes-a.votes)


    return (
        <div>
          {sorted.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
              </div>
            </div>
          )}
        </div>
      )
    }
export default AnecdoteList