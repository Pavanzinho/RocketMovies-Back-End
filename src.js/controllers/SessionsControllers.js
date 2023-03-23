const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const { compare } = require("bcryptjs")
const authConfig = require('../configs/auth')
const { sign } = require("jsonwebtoken")



class SessionsControllers {
    async create(request, response) { //async já que vai manipular banco de dados.
        const { email, password } = request.body;
        
        const user = await knex("users").where({ email }).first() //"first" garante que venha só um.
      
        if (!user) {
            throw new AppError("email e, ou senha incorreta", 401)
        };

        const passwordMatched = await compare(password, user.password)
        if (!passwordMatched) {
            throw new AppError("email e, ou senha incorreta", 401)
        }

        const { secret, expiresIn } = authConfig.jwt //olhar aquivo configs/auth para entender melhor.
        const token = sign({}, secret, {
            subject: String(user.id), // inserindo o id do usuário no token
            expiresIn // expiração.
        })


        return response.json({ user, token });

    }
}

module.exports = SessionsControllers;