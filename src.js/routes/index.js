const {Router}=require("express");

const routes=Router();
const usersRoutes=require("./usersRoutes.js")
const movie_notesRoutes=require("./movie_notesRoutes.js")
const movie_tagsRoutes=require('./movie_tagsRoutes')


routes.use("/users",usersRoutes)
routes.use("/movie_notes",movie_notesRoutes)
routes.use("/movie_tags",movie_tagsRoutes)


module.exports=routes;