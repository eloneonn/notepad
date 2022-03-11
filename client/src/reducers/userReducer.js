import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import { initializeNotes } from './noteReducer'
import { setNotification } from './notificationReducer'
import { setSorter } from './sorterReducer'

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
                dispatch(setSorter(resultedUser.sorter))
                dispatch(initializeNotes())    
            } 
        } catch (error) {
            dispatch(setNotification('error', 'Wrong email or password'))
            return error.toJSON()        
        }
        return { status: 200 }
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
            console.log(user);
            dispatch(setUser(user))
            dispatch(setSorter(user.sorter))
            dispatch(initializeNotes())
        }
    }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer