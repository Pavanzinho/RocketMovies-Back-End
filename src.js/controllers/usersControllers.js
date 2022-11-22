const sqliteConnection=require("../database/sqlite");
const AppError=require("../utils/AppError")
const {hash,compare}=require("bcryptjs")
const knex=require("../database/knex")

class UserController{

    async create(request,response){
        const{name,email,password}=request.body;

        const database= await sqliteConnection();

        const checkUserWithEmail=await database.get('SELECT * FROM users WHERE email = (?)',[email])

        const hashedPassword= await hash(password,8)
        
        if(checkUserWithEmail){
            throw new AppError("este email já está cadastrado")
        }

        await database.run(
            `
                INSERT INTO users(name,email,password) VALUES (?,?,?) 
            `,
            [name,email,hashedPassword]
        )

        response.status(201.).json();
    }

    async update(req,res){
        const{name,email,password,old_password}=req.body;
        const {id}= req.params;

        const database=await sqliteConnection();
        const user = await database.get('SELECT * FROM users WHERE id = (?)',[id]);

        if(!user){
            throw new AppError("Usuário não cadastrado no banco de dados!")
        }
        
        const userWithUpdatedEmail= await database.get('SELECT * FROM users WHERE email = (?)',[email])
        
        if(userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id){
            throw new AppError("Email já cadastrado!")
        }

        if(password && !old_password){
            throw new AppError("A senha antiga não foi informada")
            //obs: password e old_password vão ser as senhas que o usuário irá digitar na att.
        }

        if(password && old_password){
            const checkOldPassword= await compare(old_password,user.password)

            if(!checkOldPassword){
                throw new AppError("Esta não é a senha antiga deste usuário")
            }
        }

        
        user.name=name ?? user.name; // ??= se tem conteudo no name, é ele, se não, é user.name
        user.email=email ?? user.email;
        user.password=await hash(password,8);
      

        await database.run(`
        UPDATE users SET
        name=?,
        email=?,
        password=?,
        updated_at= DATETIME('now')
        WHERE id =?`,
        [user.name,user.email,user.password,id]
        );

        return res.status(200).json();

    }

    async delete(req,res){
        const {id}=req.params;

        await knex("users").where({id}).delete()
        return res.json()
    }
}

module.exports=UserController;