/* USERTYPE-TABLE (regular: id = 1, admin: id = 2) */

CREATE TABLE usertype (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO usertype (name) VALUES
    ('regular'), 
    ('admin');

/* USERS-TABLE */

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    type_id INTEGER REFERENCES usertype DEFAULT 1,
    email VARCHAR(128) UNIQUE,
    name VARCHAR(128),
    hash CHAR(60)
);

/* USERPREFERENCES-TABLE */

CREATE TABLE users (
    id SERIAL PRIMARY KEY
    user_id INTEGER REFERENCES users,
    darkmode BOOLEAN DEFAULT false,
    sorter VARCHAR(16) DEFAULT 'Last created',
    autosave BOOLEAN DEFAULT true
);

/* NOTES-TABLE */

CREATE TABLE notes (
    id UUID PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(128),
    content TEXT
); 

/* RECORDINGS-TABLE*/

CREATE TABLE recordings (
    id UUID PRIMARY KEY,
    user_id INTEGER REFERENCES users,
    note_id UUID REFERENCES notes,
    title VARCHAR(255),
    path VARCHAR(255)
);

/* FUNCTION AND TRIGGER FOR UPDATING note.modified_at -FIELD */

CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.modified_at = now();
    RETURN NEW
END;
$$ language 'plpgsql';

CREATE TRIGGER update_note_modified BEFORE UPDATE ON notes FOR EACH ROW EXECUTE PROCEDURE update_timestamp();