const app = require('./config/server');
const routes = require('./app/routes/routes');
require('./startup/prod')(app)

routes.getMovies(app);
routes.addMovie(app);
routes.updateMovie(app);
routes.deleteMovie(app);