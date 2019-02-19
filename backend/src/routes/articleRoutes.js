const Article = require('../models/article');

module.exports = function(app) {

    app.get('/articles', (req,res) => {
        Article.getArticles((err,data) => {
            res.status(200).json(data)
        });
    });

    app.get('/alticles/:name', (req,res) => {
        let name = req.params.name;
        Article.getArticleByName(name,(err,data) => {
            res.status(200).json(data)
        });
    });


    app.post('/article', (req,res) => {
        const articleData = {
            idArticle: null,
            year: req.body.year,
            season: req.body.season,
            description: req.body.description,
            idBrand: req.body.idBrand
        };

        Article.insertArticle(articleData, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Articulo insertado',
                    data: data
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    });

    app.post('/article/delete', (req,res) => {
        let idDeletedArticle = req.body.idarticle;
        console.log(idDeletedArticle);
        Article.deleteArticle(idDeletedArticle, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Articulo borrado',
                    data: data
                })
            }
            else {
                res.status(500).json({
                    success: false,
                    msg: 'Error'
                })
            }
        })
    })
}