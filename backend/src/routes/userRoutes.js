const User = require('../models/user');

module.exports = function(app) {
    app.get('/users', (req,res) => {
        User.getUsers((err,data) => {
            res.status(200).json(data)
        });
    });

    app.get('/users/:user', (req,res) => {
        console.log(req.params.user);
        let user = req.params.user;
        User.getOneUser(user, (err,data) => {
            res.status(200).json(data)
        });
    });
    

    app.post('/users', (req,res) => {
        const userData = {
            user: req.body.user,
            password: req.body.password,
            type: req.body.type,
            creationDate: null
        };

        User.insertUser(userData, (err,data) => {
            if(!err){
                console.log(data);
                res.json({
                    success: true,
                    msg: 'Usuario insertado',
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
