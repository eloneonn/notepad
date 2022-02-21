import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        user: userReducer,
    },
})

export default store
