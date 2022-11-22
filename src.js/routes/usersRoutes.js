const {Router}=require("express");
const usersRoutes=Router();
const UserController=require("../controllers/usersControllers.js")
const userController =new UserController;


function myMiddleware(request,response,next){
    if(request.body.isAdm=false){
        return response.json({message:"Usuário não autorizado"})
    }
    next()


}
usersRoutes.post("/", myMiddleware,userController.create)
usersRoutes.put("/:id", userController.update)
usersRoutes.delete("/:id",userController.delete)

module.exports=usersRoutes;