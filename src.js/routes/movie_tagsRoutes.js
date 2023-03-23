

const {Router}=require('express');
const movie_tagsRoutes=Router()
const MovieTagsControllers=require("../controllers/movieTagsControllers.js")
const movieTagsControllers= new MovieTagsControllers

const ensureAuthentication=require("../midllewares/ensureAuthentications")

movie_tagsRoutes.get('/',ensureAuthentication,movieTagsControllers.index)

module.exports=movie_tagsRoutes;




