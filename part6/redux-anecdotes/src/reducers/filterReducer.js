import { createSlice } from "@reduxjs/toolkit"
const filterReducer = createSlice({
    name: 'filter', 
    initialState: '', 
    reducers: {
        filterAction(state, action) {
            return action.payload
        }
    }
})
export const {filterAction} = filterReducer.actions
export default filterReducer.reducer