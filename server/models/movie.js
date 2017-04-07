'use strict'
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = Promise

const Schema = mongoose.Schema
var movieSchema = Schema({
 
 
  title: {
    type: String,
    required: true,
    unique:true
  },
  year: {
    type: Number,
    required: true
  },
  actors: [{
    type : Number,
    ref : 'Actor'
  }]
});


movieSchema.plugin(autoIncrement.plugin, 'Movie');
const Movie = mongoose.model('Movie', movieSchema)


module.exports = Movie