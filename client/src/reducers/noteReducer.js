import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/noteService'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload //? SORT BY LAST EDITED
        },
        deleteNote(state, action) {
            
        }
    }
})

export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const newNote = (note) => {
    return async dispatch => {

    }
}

export const updateNote = (note) => {
    return async dispatch => {

    }
}

export const removeNote = (note) => {
    return async dispatch => {

    }
}


export const { appendNote, setNotes } = noteSlice.actions
export default noteSlice.reducer