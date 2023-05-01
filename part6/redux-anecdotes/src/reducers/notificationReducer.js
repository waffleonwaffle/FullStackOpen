import { createSlice } from "@reduxjs/toolkit";
const notificationReducer = createSlice({
    name: 'notification', 
    initialState: '', 
    reducers: {
        setNotification(state, action) {
            return action.payload
        }, 
        removeNotification() {
            return null
        }
    }

})

export const {setNotification, removeNotification} = notificationReducer.actions

export default notificationReducer.reducer