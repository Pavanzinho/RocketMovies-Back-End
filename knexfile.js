// Update with your config settings.


const path=require('path')
module.exports = {
  development: {
    client: 'sqlite3', //definindo drive que as migrations vão se adaptar.
    connection: {
      filename: path.resolve(__dirname, "src.js","database","database.db")// criando conexão com a base de dados.
    },
    
    useNullAsDefault:true,  
   
    migrations: {
      directory: path.resolve(__dirname, "src.js","database","knex","migrations") // conectando as migrations.
    },
    
    pool: {
     afterCreate:(conn,cb)=>conn.run("PRAGMA foreign_keys= ON", cb) //ativando delete em cascata.
    },
  },
}
