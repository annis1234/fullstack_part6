import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = async newAnecdote => {
    const res = await axios.post(baseUrl, newAnecdote)
    return res.data
}

export const update = async updatedAnecdote => {
    const res = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    return res.data
}
export const remove = async id => {
    const res = await axios.delete(`${baseUrl}/${id}`)
    return res.data
}
