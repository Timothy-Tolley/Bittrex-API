const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const server = express()

const bittrexData = require('./routes/bittrex.js')

server.use(bodyParser.json())
server.use(express.static(path.join(__dirname, '../public')))

// Routes
server.use('/api/v1/bittrex', bittrexData)

server.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = server
