require('express-async-errors'); 

const express=require('express');
const app=express();
const migrationRun=require("./database/sqlite/migration")
const routes=require("../src.js/routes")
const AppError=require("./utils/AppError") 



migrationRun(); //executando sql e criando tabela users.


app.use(express.json()); 
app.use(routes);


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


const PORT=3333;

app.listen(PORT, ()=>console.log(`Server is running in ${PORT}`))

