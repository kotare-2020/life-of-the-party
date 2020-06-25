

exports.up = (knex, Promise) => {
    return knex.schema.createTable('players', (table)=>{
     
        table.increments('id').primary()
        table.string('player')
    })
  
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('players')

  
};