import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import { initializeNotes } from './noteReducer'
import userService from '../services/userService'

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
                
                userService.setUser(resultedUser)
                dispatch(setUser(resultedUser))
                dispatch(initializeNotes())    
            } else {
                
            }

//            blogService.setToken(resultedUser.token)

//            dispatch(initializeBlogs())
//            dispatch(setNotification('login succesful!', 4))

        } catch (error) {
            console.log(error);
//            dispatch(setNotification('wrong username or password', 4))
        }
    }
}

export const logout = () => {
    return async (dispatch) => {
        window.localStorage.removeItem('loggedUser')
        dispatch(setUser(null))
//        dispatch(setNotification('logged out!', 4))
    }
}

export const initializeUser = () => {
    return async (dispatch) => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch(setUser(user))
            dispatch(initializeNotes())

//            blogService.setToken(user.token)
    
//            dispatch(initializeBlogs())
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer