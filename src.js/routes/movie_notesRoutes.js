const {Router}=require('express');
const movie_notesRoutes=Router();
const movie_notesControllers=require("../controllers/movieNotesControllers.js")
const MovieNotesControllers=new movie_notesControllers;

movie_notesRoutes.post("/",MovieNotesControllers.create);
movie_notesRoutes.delete("/:id", MovieNotesControllers.delete)
movie_notesRoutes.get("/:id",MovieNotesControllers.show)
movie_notesRoutes.get("/",MovieNotesControllers.index)

module.exports=movie_notesRoutes;
