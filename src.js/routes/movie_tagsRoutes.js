
const e = require('express');
const {Router}=require('express');
const movie_tagsRoutes=Router()
const movie_tagsControllers=require("../controllers/movieTagsControllers.js")
const MovieTagsControllers= new movie_tagsControllers


movie_tagsRoutes.get('/:id', MovieTagsControllers.index)

module.exports=movie_tagsRoutes;




