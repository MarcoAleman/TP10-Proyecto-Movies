const db = require('../database/models');
const { Op } = require("sequelize");

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
    }
}