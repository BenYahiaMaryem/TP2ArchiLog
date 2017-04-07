'use strict'
const express = require('express')
const router = express.Router()
const movies=require('../controllers/movies')





// Movies routes

router.get('/movies',movies.getAllMovies)
.post('/movies',movies.createMovie)
.get('/movies/:_id/movie',movies.findMovieById)
.get('/movies/:title',movies.FindMovieByTitle)
.delete('/movies/:title/delete',movies.deleteMovie)
.put('/movies/:title/update',movies.updateMovie)
/*
router.post('/movies/:id/actors', movies.addActor)
    .delete('/movies/:id/actors/:mid', movies.deleteActor);
*/
// export router
module.exports = router