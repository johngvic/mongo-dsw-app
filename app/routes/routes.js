const Movies = require("../controllers/moviesController");

module.exports = {
  getMovies: (app) => {
    app.get('/api/filmes', Movies.getMovies);
  },
  
  addMovie: (app) => {
    app.post('/api/filmes', Movies.addMovie);
  },

  updateMovie: (app) => {
    app.put('/api/filmes/:id', Movies.updateMovie);
  },

  deleteMovie: (app) => {
    app.delete('/api/filmes/:id', Movies.deleteMovie);
  }
}
