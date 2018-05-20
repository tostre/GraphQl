const mysql = require("mysql");
var query;
var userId;
var recipelist;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "graphqldb"
});


var selectAll = "SELECT * FROM users";
var selectHans = "SELECT "


class Database {

    constructor() {
        this.connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "graphqldb"
        });
    }

    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            } );
        } );
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end( err => {
                if (err)
                    return reject(err);
                resolve();
            } );
        } );
    }
}

var pdb = new Database();




//module.exports.pdb = pdb;
module.exports = function(){
    this.connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "graphqldb"
    });


    query(sql, args) {
        return new Promise( (resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err)
                    return reject(err);
                resolve(result);
            } );
        } );
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end( err => {
                if (err)
                    return reject(err);
                resolve();
            } );
        } );
    }
}



