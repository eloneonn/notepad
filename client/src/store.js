import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './reducers/filterReducer'
import noteReducer from './reducers/noteReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        user: userReducer,
        notification: notificationReducer,
        filter: filterReducer,
    },
})

export default store
