# Development roadmap

## Database
- users-table DONE
- usertypes-table DONE
- notes-table DONE
- recordings-table
- errorlogs-table

## Backend
- API for users DONE
- API for logging in DONE
- API for notes DONE
- Finish validations DONE
- API for recordings

## Frontend
- Core functionality
    - Service for users DONE
    - Service for notes DONE
    - Service for recordings
    - Main view DONE
    - React components: Login DONE, Register DONE, Note DONE, NoteView DONE, NoteMasonry DONE, Settings 
    - State management with redux
    - Routing with react-router
    - React components: SearchBar and Notification DONE
- Bonus features
    - Personalized styling and dark mode
    - Implement rhyme and synonym -dictionaries with datamuse API
    - Implement embedded recordings and recording functionality
    - Implement undo/redo, note pinning and tags 
    
## Admin-functionality
- Admin react component with statistics about the app
- Admin API for deleting and adding users, changing passwords?

## BUGS AND OTHER TODOS
- Fix creating a new note having to wait for database for id
- Fix main view having to render twice when logging in (2nd render after fetching notes from db)
- Implement a better saving mechanism for notes