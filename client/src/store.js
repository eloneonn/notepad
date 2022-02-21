import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'

const store = configureStore({
    reducer: {
        notes: noteReducer
    },
})

export default store
