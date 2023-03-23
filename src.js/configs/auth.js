module.exports={
    jwt: {
        secret: process.env.AUTH_SECRET || "default",
        //senha setada na variável de ambiente .env
        expiresIn: "1d"
    }
}

