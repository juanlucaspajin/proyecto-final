const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'lg_calzados'
});

let shoeModel = {};

shoeModel.getShoes = (callback) => {
    if(connection) {
        connection.query(
            'select a.description, a.season, a.year, s.size,s.stock,s.price,s.idshoes '+
            'from shoes s '+
            'inner join article a ' +
                'on s.idArticle = a.idarticle',
                (err,rows) => {
                    if(err) {throw err}
                    else {
                        callback(null,rows);
                    }
            }
        )
    }
};

shoeModel.getUnrepeatedShoes = (callback) => {
    if(connection) {
        connection.query(
            'select a.description, a.season '+
            'from shoes s '+
            'inner join article a '+
	            'on s.idArticle = a.idarticle '+
            'group by a.description, a.season',
                (err,rows) => {
                    if(err) {throw err}
                    else {
                        callback(null,rows);
                    }
            }
        )
    }
};

shoeModel.getShoesByName = (name,callback) => {
    if(connection) {
        connection.query(
            'select a.description, a.season, a.year, s.size,s.stock,s.price '+
            'from shoes s '+
            'inner join article a ' +
                'on s.idArticle = a.idarticle '+
                'where a.description = ?',name,
                (err,rows) => {
                    if(err) {throw err}
                    else {
                        callback(null,rows);
                    }
            }
        )
    }
};

shoeModel.insertShoe = (shoeData, callback) => {
    if(connection) {
        connection.query(
            'insert into shoes set ?',shoeData,
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

shoeModel.deleteShoe = (id,callback) => {
    if(connection) {
        connection.query(
            'delete from shoes where idshoes = ?',id,
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

shoeModel.updateShoe = (shoeData,callback) => {
    let idshoes = shoeData.idshoes
    let size = shoeData.size;
    let stock = shoeData.stock;
    let price = shoeData.price;
    let idarticle = shoeData.idarticle;
    if(connection) {
        connection.query(
            'update shoes '+
            'set size = ?, stock = ?, price = ?, idArticle = ? '+
            'where idshoes = ?', [size,stock,price,idarticle,idshoes],
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

module.exports = shoeModel;