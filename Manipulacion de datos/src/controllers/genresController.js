const db = require('../database/models');
const Op = require('sequelize');

module.exports = {
    list: (req,res)=>{
        db.Genre.findAll()
        .then((genres)=> {
            res.render('genresList', {
                genres
            })
        })
        .catch(errors => {
            res.send(errors);
        })
    },
    detail: (req, res) => {
        db.Genre.findByPk(req.params.id)
        .then((genre) => {
            res.render('genresDetail', {
                genre
            })
        })
        .catch(errors => {
            res.send(errors);
        })
    }
}