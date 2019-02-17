const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'lg_calzados'
});

let userModel = {};

userModel.getUsers = (callback) => {
    if(connection) {
        connection.query('SELECT * FROM users', (err,rows) => {
            if(err) {throw err}
            else {
                callback(null,rows);
            }
        });
    };
};

userModel.insertUser = (userData, callback) => {
    if(connection) {
        connection.query(
            'INSERT INTO users SET ?', userData,
            (err, result) => {
                if(err) {throw err}
                else {
                    callback(null, {
                        type: result.type
                    })
                } 
            }
        )
    }
};

userModel.getOneUser = (u,callback) => {
    if(connection) {
        connection.query(
            'SELECT * FROM users WHERE user = ?',u,
            (err,result) => {
                if(err) {throw err}
                else {
                    callback(null,result);
                } 
            }
        )
    }
}

module.exports = userModel;