const environment = process.env.NODE_ENV || 'development'
const config = require('../../knexfile')[environment]
const connection = require('knex')(config)

function getPlayers(db = connection) {
  return db('players').select()
}

function getPlayer(id, db = connection) {
  return db('widgets')
  .where("id", id)
  .first()
}

module.exports = {
    getPlayers,
    getPlayer
}