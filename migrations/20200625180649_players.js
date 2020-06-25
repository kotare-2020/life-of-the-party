exports.up = (knex, promise) => {
    return knex.schema.createTable('players', (table)=>{
        table.increments('id').primary()
        table.string('player')
    })
  
};

exports.down = (knex, promise) => {
    return knex.schema.dropTable('players')
};