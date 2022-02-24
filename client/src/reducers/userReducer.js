import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import { initializeNotes } from './noteReducer'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
            return action.payload
        },
        removeUser(state, action) {
            return null
        }
    }
})

export const login = (user) => {
    return async (dispatch) => {
        try {
            const resultedUser = await loginService.login( {...user} )
            if (resultedUser) {
                window.localStorage.setItem('loggedUser', JSON.stringify(resultedUser))
                
                dispatch(setNotification('success', 'Login succesful!'))
                dispatch(setUser(resultedUser))
                dispatch(initializeNotes())    
            } else {
                dispatch(setNotification('error', 'Wrong email or password'))
            }

//            blogService.setToken(resultedUser.token)

//            dispatch(initializeBlogs())
//            dispatch(setNotification('login succesful!', 4))

        } catch (error) {
            console.log(error);
            dispatch(setNotification('error', 'Wrong email or password'))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))      
        dispatch(setNotification('info', 'Logged out!' ))
    }
}

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            dispatch(setUser(user))
            dispatch(initializeNotes())
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer