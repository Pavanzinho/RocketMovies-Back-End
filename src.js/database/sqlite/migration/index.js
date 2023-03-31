const sqliteConnection=require('../../sqlite');
const createMovieNotes = require('./createMovieNotes');
const createUser=require('./createUsers')
const createMovieTags=require("./createMovieTags")

async function migrationRun(){
    const schemas= `${createUser};${createMovieNotes};${createMovieTags}`

    const db= await sqliteConnection();
    await db.exec(schemas).catch(error=>console.error(error))
    

}
module.exports=migrationRun;