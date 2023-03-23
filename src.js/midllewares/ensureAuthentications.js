const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth")
const AppError = require("../utils/AppError")

function ensureAuthentication(request, response, next) {
    const authHeader = request.headers.authorization; //token vai estar nesse destino.

    if (!authHeader) {
        throw new AppError("JTW Token não informado ", 401)
    }
    
    const [, token] = authHeader.split(" ") // o split separa pelo carecter dentro do parametro, ou seja: authHeader já deve ter
                                            //um espaço em si, colocado la no front end quando foi adicionado no header.



    /*o formato de authHeader vai sder : ["Bare, token"]. Neste caso aqui, Bare não importa, então já estou separando Bare do token e  criando uma variável 
    que acessa a segunda posição e authHeader(o token em sí). Assim, já temos o token separado de Bare e dentro de uma variável.*/


    try {
        const { sub: user_id } = verify(token, authConfig.jwt.secret) //sub: "caso verificação de certo, coloque token e sub e de o nome de user_id"

        request.user = {        //inserindo propriedade user dentro da request, que vai possuir um id= user_id=token
            id: Number(user_id)
        }

        return next()

    }
    catch {
        throw new AppError("JTW Token Inválido ", 401)
    }

}
module.exports = ensureAuthentication;