const { json } = require('express');
const knex=require('../database/knex');

 class TagsController{

    async index(request,response){
        const {id}= request.params;

        const movie_tags=await knex("movie_tags")
        .where({id})

        return response.json(movie_tags)


    }
    
     
    
}

module.exports=TagsController