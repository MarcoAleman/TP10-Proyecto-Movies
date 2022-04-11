const db = require('../database/models');
const Movies = db.Movie;
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');


module.exports = {
    list: (req,res)=>{
        db.Movie.findAll()
        .then((movies)=> {
            res.render('moviesList', {
                movies
            })
        })
        .catch(errors => {
            res.send(errors);
        })
    },
    detail: (req, res) => {
        db.Movie.findByPk(req.params.id)
        .then((movie) => {
            res.render('moviesDetail', {
                movie
            })
        })
    },
    new: (req, res)=>{
        db.Movie.findAll({
            order: [['release_date', 'DESC']]
        })
        .then((movies)=> {
            res.render('newestMovies', {
                movies
            })
        })
        .catch(errors => {
            res.send(errors);
        })
    },
    recomended: (req, res)=> {
        db.Movie.findAll({
            where : {
                rating : {[Op.gte]: 7}  
            },
            order : [['rating', 'DESC']],
            limit: 5
        })
        .then((movies) => {
            res.render('recommendedMovies', {
                movies
            })
        })
        .catch(errors => {
            res.send(errors)
        })
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: (req, res) => {
        res.render('moviesAdd');
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
        Movies.findByPk(req.params.id)
        .then((movie)=>{
            res.render('moviesEdit', {
                movie
            })
        })
        .catch((error)=>{
            res.send(error)
        })
    },
    update: (req, res) => {
        const {title, rating, awards, release_date, length } = req.body;
        Movies.update({
            title,
            rating,
            release_date,
            length,
            awards
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
        .then((movie)=>{
            res.render('moviesDelete', {
                movie
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