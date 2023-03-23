const { json } = require("express");
const knex = require("../database/knex")

class MovieTagsControllers {
    async index(request, response) {
        // const {user_id}=request.body;
        const user_id = request.user.id;
        const tags = await knex("movie_tags")
            .where({ user_id }) // vai nas tags e filtra pra mim onde for igual ao user_id]
            .groupBy("name") // agrupa a resposta pelo campo "name"/não enviará na resposta duas tags com mesmo "name"
            
        return response.json(tags)
        
    }
}

module.exports = MovieTagsControllers;