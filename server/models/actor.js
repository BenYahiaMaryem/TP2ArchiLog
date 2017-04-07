'use strict'
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment');
mongoose.Promise = Promise

const Schema = mongoose.Schema
var actorSchema = Schema({
  
  name: {
    type: String,
    required: true,
    unique:true
  },
  birth_year: {
    type: Number,
    required: true
  },
  movies: [{
    type :Number,
    ref : 'Movie'
  }]
});

actorSchema.plugin(autoIncrement.plugin, 'Actor');
const Actor = mongoose.model('Actor', actorSchema)


module.exports = Actor