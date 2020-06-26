const path = require('path')
const express = require('express')

const game = require('./routes/game')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

server.use('/api/v1/game', game)

module.exports = server
