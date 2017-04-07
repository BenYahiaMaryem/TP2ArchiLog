'use strict'
let movie = require('../models/movie');

const bodyParser = require('body-parser');

module.exports={

getAllMovies:(req, res) => {
        var response = {}
        movie
            .find()
            .populate('actors')
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
  
  FindMovieByPrice:(req,res)=> {
        var response = {}
        //we specifie the interval of price by req 
        movie.aggregate({$match: { price:{ $gt: 70, $lt: 90 }}}, (err, data) => {
          
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },

    FindMovieByTitle:(req,res)=> {
        var response = {}
        //we specifie the interval of price by req 
        movie.findOne({title: req.params.title}, (err, data)=> {
          
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response = data;
            }
            res.json(response);
        })
    },

createMovie:(req,res,next)=>{
    let db=new movie(req.body);
   
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

findMovieById:(req,res)=>{

var response={};

movie.findOne({_id: req.params._id}, (err, movie) => {
            // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error" : true, "message" : "Error fetching data"};
            } else {
                response =movie;
            }
            res.json(response);
        })


},

deleteMovie:(req,res)=>{
   
movie.findOneAndRemove({ title: req.params.title}, function(err) {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  }

     
,
updateMovie: (req, res, next) => {
    var response={};
    movie.findOneAndUpdate({ title: req.params.title }, req.body, function(err, movie) {
      if (err) return res.status(400).json(err);
   
      
             else {
                response =movie;
            }
            res.json(response);
        });
  

}



};