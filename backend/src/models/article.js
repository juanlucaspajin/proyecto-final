const mysql = require('mysql');

connection = mysql.createConnection({
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'root',
    database: 'lg_calzados'
});

let articleModel = {};

articleModel.getArticles = (callback) => {
    if(connection) {
        connection.query('SELECT * FROM article ORDER BY description', (err,rows) => {
            if(err) {throw err}
            else {
                callback(null,rows);
            }
        });
    };
};

articleModel.getArticleByName = (name,callback) => {
    if(connection) {
        connection.query('SELECT * FROM article WHERE description = ?',name, (err,rows) => {
            if(err) {throw err}
            else {
                callback(null,rows);
            }
        });
    };
};

articleModel.insertArticle = (articleData, callback) => {
    if(connection) {
        connection.query(
            'INSERT INTO article SET ?', articleData,
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

articleModel.deleteArticle = (id, callback) => {
    if(connection) {
        connection.query(
            'DELETE FROM article WHERE idarticle = ?',id,
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

module.exports = articleModel;