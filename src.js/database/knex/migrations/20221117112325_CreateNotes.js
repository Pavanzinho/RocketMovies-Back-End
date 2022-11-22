exports.up= knex=>knex.schema.createTable("movie_notes",table=>{
    table.increments("id");
    table.text("movie_title");
    table.text("movie_description");
    table.specificType('rating', 'tinyint(1)') //descobrir como limitar de 1 a 5. 
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").default(knex.fn.now()) // registra o horário atual de quando cadastra a nota.
    table.timestamp("updated_at").default(knex.fn.now()) 
})

exports.down=knex=>knex.schema.dropTable("movie_notes");