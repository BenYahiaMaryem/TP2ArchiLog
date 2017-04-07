'use strict'
const express = require('express')
const router = express.Router()
const actors=require('../controllers/actors')




// Actors routes
router.get('/actors',actors.getAllActors)
.post('/actors',actors.createActor)
.get('/actors/:_id/actor',actors.findActorById)
.get('/actors/:name',actors.FindActorByName)
.delete('/actors/:name/delete',actors.deleteActor)
.put('/actors/:name/update',actors.updateActor)
module.exports = router