const {Router}=require('express');
const movie_notesRoutes=Router();
const MovieNotesControllers=require("../controllers/movieNotesControllers.js")
const movieNotesControllers=new MovieNotesControllers

const ensureAuthentication=require("../midllewares/ensureAuthentications")

movie_notesRoutes.use(ensureAuthentication)
movie_notesRoutes.post("/",movieNotesControllers.create);
movie_notesRoutes.delete("/:id", movieNotesControllers.delete)
movie_notesRoutes.get("/:id",movieNotesControllers.show)
movie_notesRoutes.get("/",movieNotesControllers.index)

module.exports=movie_notesRoutes;
