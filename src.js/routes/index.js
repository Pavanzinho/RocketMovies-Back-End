const {Router}=require("express");
const path=require("path") 

const routes=Router();
const usersRoutes=require("./usersRoutes.js")
const movie_notesRoutes=require("./movie_notesRoutes.js")
const movie_tagsRoutes=require('./movie_tagsRoutes')
const sessionsRoutes=require("../routes/sessionsRoutes")


routes.use("/users",usersRoutes)
routes.use("/sessions", sessionsRoutes)
routes.use("/movie_notes",movie_notesRoutes)
routes.use("/movie_tags",movie_tagsRoutes)





module.exports=routes;