'use strict'
let actor = require('../models/actor');

const bodyParser = require('body-parser');

module.exports={

getAllActors:(req, res) => {
        var response = {}
        actor
            .find()
            .populate('movies')
            .exec ((err, data) => {
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },
  
  FindActorByPrice:(req,res)=> {
        var response = {}
        //we specifie the interval of price by req 
        actor.aggregate({$match: { price:{ $gt: 70, $lt: 90 }}}, (err, data) => {
          
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },

    FindActorByName:(req,res)=> {
        var response = {}
        //we specifie the interval of price by req 
        actor.findOne({name: req.params.name}, (err, data)=> {
          
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },

createActor:(req,res,next)=>{
    let db=new actor(req.body);
   
  var response = {};
 db.save(function(err){
            // save() will run insert() command of MongoDB.
            // it will add new data in collection.
            if(err) {
                return res.send (err)
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
     


},

findActorById:(req,res)=>{

var response={};

actor.findOne({_id: req.params._id}, (err, actor) => {
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response =actor;
            }
            res.json(response);
        })


},

deleteActor:(req,res)=>{
   

actor.findOneAndRemove({ name: req.params.name }, function(err) {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
}
,
updateActor: (req, res, next) => {
    var response={};
    actor.findOneAndUpdate({ name: req.params.name }, req.body, function(err, actor) {
      if (err) return res.status(400).json(err);
   
      
             else {
                response =actor;
            }
            res.json(response);
        });
  

}



};