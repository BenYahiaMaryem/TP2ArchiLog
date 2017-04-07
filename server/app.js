// Get dependencies
const express = require('express')
const path = require('path')
const http = require('http')
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
mongoose.Promise = Promise


//mongoose.connect('mongodb://localhost:27017/data2')
const autoIncrement = require('mongoose-auto-increment');
const connection= mongoose.connect('mongodb://localhost:27017/movies')
autoIncrement.initialize(connection)

//import models
//const actor= require('./server/models/actor')
//const movie = require('./server/models/movie')




const app = express()

// Parsers for POST data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


require('./routes/actor')

require('./routes/movie')



module.exports=app