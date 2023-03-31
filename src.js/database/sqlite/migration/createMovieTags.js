


const createTags = `
CREATE TABLE IF NOT EXISTS movie_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  note_id INTEGER REFERENCES movie_notes(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  name TEXT
);
`;

module.exports = createTags;