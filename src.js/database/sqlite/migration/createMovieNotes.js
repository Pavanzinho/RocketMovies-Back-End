

const createMovieNotes = `
CREATE TABLE IF NOT EXISTS movie_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_title TEXT,
  movie_description TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  user_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`

module.exports = createMovieNotes;



