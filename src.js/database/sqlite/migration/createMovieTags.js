const createMovieTags = `
    CREATE TABLE IF NOT EXISTS movie_tags (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        note_id INTEGER,
        user_id INTEGER,
        name TEXT,
        FOREIGN KEY (note_id) REFERENCES movie_notes(id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;

module.exports=createMovieTags;