const Brand = require('../models/brand');

module.exports = function(app) {

    app.get('/brands', (req,res) => {
        Brand.getBrands((err,data) => {
            res.status(200).json(data)
        });
    });

    app.get('/brands/:name', (req,res) => {
        let name = req.params.name;
        Brand.getBrandByName(name,(err,data) => {
            res.status(200).json(data)
        });
    });


    app.post('/brand', (req,res) => {
        const brandData = {
            idbrand: null,
            brandName: req.body.brandName,
        };

        Brand.insertBrand(brandData, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Marca insertada',
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

    app.post('/brand/delete', (req,res) => {
        let idbrand = req.body.idbrand;

        Brand.deleteBrand(idbrand, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Marca borrada',
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
