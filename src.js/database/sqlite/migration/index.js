const sqliteConnection=require('../../sqlite');
const createUser=require('./createUsers')

async function migrationRun(){
    const schema=[
        createUser
    ].join('');

    sqliteConnection().then(db=>db.exec(schema))
    .catch(error=>console.error(error))

}
module.exports=migrationRun;