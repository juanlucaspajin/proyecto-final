const Shoe = require('../models/shoe');

module.exports = function(app) {
    app.get('/shoes', (req,res) => {
        Shoe.getShoes((err,data) => {
            res.status(200).json(data)
        })
    });

    app.get('/shoes/articles', (req,res) => {
        Shoe.getUnrepeatedShoes((err,data) => {
            res.status(200).json(data)
        })
    });

    app.get('/shoes/:name', (req,res) => {
        let name = req.params.name;
        Shoe.getShoesByName(name,(err,data) => {
            releaseEvents.status(200).json(data)
        })
    });

    app.post('/shoes', (req,res) => {
        let shoeData = {
            idshoes: null,
            size: req.body.size,
            stock: req.body.stock,
            price: req.body.price,
            idarticle: req.body.idarticle
        };

        Shoe.insertShoe(shoeData, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Zapato insertado',
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

    app.post('/shoes/delete', (req,res) => {
        let idDeletedShoe = req.body.idshoes;
        console.log(idDeletedShoe);
        Shoe.deleteShoe(idDeletedShoe, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Zapato borrado',
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

    app.post('/shoes/update',(req,res) => {
        let shoeData = {
            idshoes: req.body.idshoes,
            size: req.body.size,
            stock: req.body.stock,
            price: req.body.price,
            idarticle: req.body.idarticle
        };

        Shoe.updateShoe(shoeData, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Zapato Actualizado',
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