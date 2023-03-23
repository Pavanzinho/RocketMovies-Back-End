const knex=require("../database/knex")
const AppError=require("../utils/AppError")
const DiskStorage=require("../providers/DiskStorage")

const diskStorage=new DiskStorage();

class UserAvatarControllers{
    async update(request,response){
        const user_id=request.user.id
        const avatarFileName=request.file.filename;

        const user=await knex("users").where({id:user_id}).first();

        if(!user){
            throw new AppError("Acesso apenas para clientes credenciados")
            // a linha acima só será executada caso o cliente não tenha o token, já que "user_id" é inserido no request ao passar pelo middleware(ensureAuthentication)
        }

        if(user.avatar){
            await diskStorage.deleteFile(user.avatar);
        }

        const filename=await diskStorage.saveFile(avatarFileName);
        user.avatar=filename;

        await knex ("users").update(user).where({id:user_id});

        return response.json(user)

    }
}
module.exports=UserAvatarControllers