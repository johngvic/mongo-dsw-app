const client = require('../../config/dbConnection');

module.exports = class MoviesModel {

    static async getMovies() {
        console.log(`[getallmovies]`);
        const cursor = await client.db("dsw").collection("movies").find();
        const movies = await cursor.toArray();
        return movies;
    }

    static async addMovie(data) {
        const movies = await this.getMovies();

        try {
            const newMovie = {
                id: movies[movies.length - 1].id + 1,
                name: data.name,
                director: data.director,
                link: data.link,
                date: new Date()
            }
            const addedMovie = await client.db("dsw").collection("movies").insertOne(newMovie);
            console.log(`New movie inserted with the following id ${addedMovie.insertedId}`);
            
            return addedMovie;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    }

    static async updateMovie(data, id) {
        try {
            const updatedMovie = {
                name: data.name,
                director: data.director,
                link: data.link,
                date: new Date()
            }

            const update = await client.db("dsw").collection("movies").updateOne(
                { id: parseInt(id) },
                { $set: updatedMovie }
            )
            
            return update;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    }

    static async deleteMovie(id) {
        try {
            const deleteMovie = await client.db("dsw").collection("movies").deleteOne(
                { id: parseInt(id) }
            )
                        
            return deleteMovie;
        } catch (error) {
            console.log(`[movieService] Error: ${error}`);
        }
    }
}