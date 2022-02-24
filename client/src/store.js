import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        user: userReducer,
        notification: notificationReducer,
    },
})

export default store
