import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            state = action.payload
            return state
        },
        removeNotification(state) {
            state = null
            return state
        }
    }
})

const { setNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer

export const handleNotification = (message, time) => {
    
    const sec = time * 1000

    return dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, sec)
    }
}