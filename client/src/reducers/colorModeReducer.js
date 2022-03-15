import { createSlice } from "@reduxjs/toolkit";

const colorModeSlice = createSlice({
    name: 'colorMode',
    initialState: 'light',
    reducers: {
        setColorMode (state, action) {
            return action.payload
        },
        toggleColorMode (state, action) {
            if (state === 'light') {
                return 'dark'
            } else {
                return 'light'
            }
        }
    }
})

export const initializeColorMode = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        const darkmode = JSON.parse(loggedUserJSON).darkmode

        darkmode ? dispatch(setColorMode('dark')) : dispatch(setColorMode('light')) 
    }
}

export const { setColorMode, toggleColorMode } = colorModeSlice.actions
export default colorModeSlice.reducer