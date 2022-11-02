const MoviesModel = require("../models/moviesModel");
const Joi = require('joi');
const { deleteMovie } = require("../models/moviesModel");

module.exports = class MoviesController {

   static async getMovies(req, res, next) {
      console.log('[Movies Controller] getMovies');
      try {
         const movies = await MoviesModel.getMovies();
         if (!movies) {
            res.status(404).json(`Não existe filme cadastrado.`);
         }
         movies.forEach(movie => {
            console.log(`[Movie controller: retorno do banco] ${movie.name}`);
         });
         res.status(200).json(movies);
      } catch (error) {
         console.log(`[Movies Controller Error] ${error}`);
         res.status(500).json({ error: error })
      }
   }

   static async addMovie(req, res, next) {
      console.log('[Add Movie Controller]', req.body);

      const schema = Joi.object({
         name: Joi.string().min(3).max(50).required(),
         director: Joi.string().min(3).max(50).required(),
         link: Joi.string().min(3).max(150).uri().required()
      })

      const result = schema.validate(req.body)
      if (result.error) return res.status(400).send(result.error.details[0].message)

      const movie = {
         name: req.body.name,
         director: req.body.director,
         link: req.body.link,
      }

      try {
         const addedMovie = await MoviesModel.addMovie(movie)
         res.status(200).json(addedMovie)
      } catch (error) {
         res.status(500).json({ error })
      }
   }

   static async updateMovie(req, res, next) {
      console.log('[Update Movie Controller]', req.body);

      const schema = Joi.object({
         name: Joi.string().min(3).max(50).required(),
         director: Joi.string().min(3).max(50).required(),
         link: Joi.string().min(3).max(150).uri().required()
      })

      const result = schema.validate(req.body)
      if (result.error) return res.status(400).send(result.error.details[0].message)

      const id = req.params.id;
      const movie = {
         name: req.body.name,
         director: req.body.director,
         link: req.body.link,
      }

      try {
         const update = await MoviesModel.updateMovie(movie, id)
         if (update.modifiedCount === 0) res.status(400).json('Movie not found')
         res.status(200).json(update)
      } catch (error) {
         res.status(500).json({ error })
      }
   }

   static async deleteMovie(req, res, next) {
      console.log('[Delete Movie Controller]');

      const id = req.params.id;

      try {
         const deleteMovie = await MoviesModel.deleteMovie(id)

         if (deleteMovie.deletedCount === 0) res.status(400).json('Movie not found')

         res.status(200).json(deleteMovie)
      } catch (error) {
         res.status(500).json({ error })
      }
   }
}