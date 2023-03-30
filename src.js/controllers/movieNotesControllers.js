const sqliteConnection=require('../database/sqlite');
const knex=require('../database/knex');
const {hash,compare}=require('bcryptjs');
const AppError=require('../utils/AppError');


 class MovieNotesControllers{

     async create(request,response){
        const user_id=request.user.id;
        const {movie_title,movie_description,rating,movie_tags}=request.body;
        


//movie_notes       
        const note_id=await knex("movie_notes").insert({
            movie_title,
            movie_description,
            rating,
            user_id,
        })

//movie_tags

        const tagsInsert=movie_tags.map(name=>{
            return{
                note_id,
                user_id,
                name
            }
        })                  
        await knex("movie_tags").insert(tagsInsert)
        
        response.json();

    }

    async delete(request,response){
        const {id}=request.params;

        await knex("movie_notes").where({id}).delete()
        
        return response.json()
    }

    async show(request, response){
        const {id}=request.params;

        const movie_notes= await knex("movie_notes").where({id}).first();
        const movie_tags= await knex("movie_tags").where({note_id:id}).orderBy("name")
        
        return response.json(
            {
                ...movie_notes,
                movie_tags
            })
        
    }

    async index(req,res){
        const {movie_title, movie_tags}=req.query;
        const user_id = req.user.id;

  
        
       
        let notes;

        if(movie_tags){
            const filterTags=movie_tags.split(',').map(tag=>tag.trim())
            
            notes=await knex("movie_tags")
            .select([
                "movie_notes.id",
                "movie_notes.movie_title",
                "movie_notes.user_id",
            ])
            .where("movie_notes.user_id", user_id)
            .whereLike("movie_notes.movie_title", `%${movie_title}%`)
            .whereIn("name",filterTags)
            .innerJoin("movie_notes","movie_notes.id","movie_tags.note_id")
            .groupBy("notes.id")
            .orderBy("movie_notes.movie_title")
          
        }
            else{ 
                notes=await knex("movie_notes")
                .where({user_id})
                .whereLike("movie_title", `%${movie_title}%`)
                .orderBy("movie_title")
            }
       

        const userTags=await knex("movie_tags").where({user_id});
        const notesWithTags=notes.map(note=>{
            const notesTags=userTags.filter(tag=>tag.note_id ===note.id)
            
            return {
                ...note,
                movie_tags:notesTags
            }
        })
        console.info(notesWithTags)
        return res.json(notesWithTags)
    }
}
module.exports=MovieNotesControllers;