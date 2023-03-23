const {Router}=require("express");
const usersRoutes=Router();

const multer=require("multer")
const uploadConfig=require("../configs/upload")
const upload=multer(uploadConfig.MULTER)


const UserController=require("../controllers/usersControllers.js")
const userController =new UserController;

const UserAvatarControllers = require("../controllers/UserAvatarControllers");
const userAvatarControllers=new UserAvatarControllers();


const ensureAuthentication=require("../midllewares/ensureAuthentications")

usersRoutes.post("/",userController.create)
usersRoutes.put("/", ensureAuthentication,userController.update)
usersRoutes.delete("/",userController.delete)
usersRoutes.patch("/avatar",ensureAuthentication,upload.single("avatar"),userAvatarControllers.update)


module.exports=usersRoutes;