const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: (req, res) => {
        Genres.findAll()
        .then((allGenres) =>{
            res.render('moviesAdd',{
                allGenres
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    },
    create: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            Movies.create({
                ...req.body
            })
            .then( movie => {
                res.redirect('/movies')
            })
            .catch((error)=>{
                console.log(error)
            })
        } else {
            res.render('moviesAdd', {
                allGenres,
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    edit: (req, res) => {
        Movies.findByPk(req.params.id,{
            include : [{association : "genre"}]
        })
        .then(Movie =>{
            Genres.findAll()
            .then(allGenres =>{
                res.render('moviesEdit',{
                    Movie,
                    allGenres
                })
            })
        })
        .catch((error)=>{
            res.send(error)
        })
    },
    update: (req, res) => {
        Movies.update({
            ...req.body
        },{
            where: {
                id: req.params.id
            }
        })
        .then((result)=>{
            if(result){
                res.redirect('/movies')
            }
        })
        .catch((error)=>{
            res.send(error)
        })
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
        .then((Movie)=>{
            res.render('moviesDelete', {
                Movie
            })
        })
        .catch((error)=>{
            res.send(error)
        })
    },
    destroy: function (req, res) {
        db.Movie.destroy({
            where: {
                id: req.params.id,
            }
        })
        .then((result)=> {
            res.redirect('/movies');
        })
        .catch((error)=>{
            res.send(error)
        })
    }
}

module.exports = moviesController;