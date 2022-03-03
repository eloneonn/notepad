import { createSlice } from "@reduxjs/toolkit";

const sorterSlice = createSlice({ // SORT BY... 0: CREATED, 1: EDITED, 2: ABC
    name: 'sorter',
    initialState: 0,
    reducers: {
        setSorter (state, action) {
            return action.payload
        }
    }
})

export const { setSorter } = sorterSlice.actions
export default sorterSlice.reducer