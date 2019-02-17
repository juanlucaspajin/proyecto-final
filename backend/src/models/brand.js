const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'lg_calzados'
});

let brandModel = {};

brandModel.getBrands = (callback) => {
    if(connection) {
        connection.query('SELECT * FROM brand ORDER BY brandName', (err,rows) => {
            if(err) {throw err}
            else {
                callback(null,rows);
            }
        });
    };
};

brandModel.getBrandByName = (name,callback) => {
    if(connection) {
        connection.query('SELECT * FROM brand WHERE brandName = ?',name, (err,rows) => {
            if(err) {throw err}
            else {
                callback(null,rows);
            }
        });
    };
};

brandModel.insertBrand = (brandData, callback) => {
    if(connection) {
        connection.query(
            'INSERT INTO brand SET ?', brandData,
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

brandModel.deleteBrand = (id, callback) => {
    if(connection) {
        connection.query(
            'DELETE FROM brand WHERE idbrand = ?',id,
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
}

module.exports = brandModel;