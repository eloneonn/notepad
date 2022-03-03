import { createSlice } from "@reduxjs/toolkit";
import noteService from '../services/noteService'

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        appendNote(state, action) {
            state.unshift(action.payload)
        },
        setNotes(state, action) {
            return action.payload //? SORT BY LAST EDITED
        },
        deleteNote(state, action) {
            return state.filter(e => e.id !== action.payload.id)
        },
        changeNote(state, action) {
            const index = state.findIndex(e => e.id === action.payload.id)
            state[index] = action.payload
        },
        clearNotes(state, action) {
            return []
        }
    }
})

export const initializeNotes = () => {
    return async dispatch => {
        try {
            const notes = await noteService.getAll()
            dispatch(setNotes(notes))
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

export const newNote = (newNote) => {
    return async dispatch => {
        const response = await noteService.create(newNote)

        dispatch(changeNote(response))
    }
}

export const updateNote = (note) => {
    return async dispatch => {
        await dispatch(changeNote(note))
        const response = await noteService.update(note)

        return response
    }
}

export const removeNote = (note) => {
    return async dispatch => {
        await dispatch(deleteNote(note))
        const response = await noteService.remove({ data : { note } })

        return response
    }
}


export const { appendNote, setNotes, deleteNote, changeNote, initializeNotesLocally, clearNotes } = noteSlice.actions
export default noteSlice.reducer