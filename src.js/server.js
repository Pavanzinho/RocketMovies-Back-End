require("dotenv/config")
require('express-async-errors'); 

const express=require('express');
const app=express();
const migrationRun=require("./database/sqlite/migration")
const routes=require("../src.js/routes")
const AppError=require("./utils/AppError") 
const cors = require("cors")
const path=require("path")
const uploadConfig=require("./configs/upload")

migrationRun(); //executando sql e criando tabela users.

app.use(express.json()); 
app.use(cors());
app.use(routes);
app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))


//TRATAMENTO DE ERROS
app.use((error,request,response,next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:'error',
            message:error.message
        })
    }

    if(response.status(500)){
        console.error(error)
    }
    
    return response.status(500).json({
        status:"error",
        message:"Internal Server error"
    })
})


const PORT=process.env.PORT || 3333;
/*o server será iniciado na porta setada na variável de ambiente
criada no arquivo .env*/

app.listen(PORT, ()=>console.log(`Server is running in ${PORT}`))

