import store from '../store'

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
            return action.payload
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
            var notes = await noteService.getAll()
        } catch (error) {
            console.log(error)
        }

        dispatch(setNotes(notes))
        dispatch(sortNotes())
    }
}

export const newNote = (newNote) => {
    return async dispatch => {
        const response = await noteService.create(newNote)

        dispatch(changeNote(response))
        dispatch(sortNotes())
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

export const sortNotes = () => {
    return async dispatch => {
        const notes = store.getState().notes
        const sorter = store.getState().sorter

        const notesToSort = [...notes]
        var sortedNotes = []

        switch (sorter) {
            case 'Last created':
                sortedNotes = notesToSort.sort((a, b) => Date(a.created_at) - Date(b.created_at))
                dispatch(setNotes(sortedNotes))

                break
            case 'Last edited':
                sortedNotes = notesToSort.sort((a, b) => Date(a.modified_at) - Date(b.modified_at))
                dispatch(setNotes(sortedNotes))

                break
            case 'Alphabetical':
                sortedNotes = notesToSort.sort((a, b) => a.title.localeCompare(b.title))
                dispatch(setNotes(sortedNotes))

                break
            default:
                dispatch(setNotes(notesToSort))
                break
        }


    }
}


export const { appendNote, setNotes, deleteNote, changeNote, initializeNotesLocally, clearNotes } = noteSlice.actions
export default noteSlice.reducer