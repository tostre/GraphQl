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

function getUserName(args){
    var name = "def";

    return pdb.query(`SELECT name FROM users WHERE userId = 1`, args)
        .then( result => {
            // do smth with the result
            //console.log(result[0].name);
            name = result[0].name;
        }).then( (result) => {result[0].name})

}

function test(){
    console.log
}











function connectToDb(){
    con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
    });
}

function queryDb(sql){
    con.query(sql, function (err, result) {
        if (err) throw err;
        return result;
    });
}

function selectAllFromDb(){
    con.query("SELECT * FROM users", function (err, result, fields) {
        if (err) throw err;
        //console.log(result);
    });
}

function getRecipesByUser(name){
    if(name){
        connectToDb();
        con.query("SELECT userId FROM users WHERE name =" +  `\'${name}\'`, function(err, result){
            if(err) throw err;
            //console.log(result[0].userId);
            //console.log(result);
            setUserId(result[0].userId);
            //console.log(userId);
            con.query(`SELECT recipeId FROM user_recipes WHERE userId = ` + result[0].userId, function(err, result){
                if(err) throw err;
                //console.log(result);

                // JETZT MUSS FÜR JEDEN EINTRAG IM ARRAY DAS REZEPT AUSGELESEN WERDEN
            })

        })
    } else {
        console.log("You have to provide a user name or id");
    }
}

function fetchUser(id){
    connectToDb();
    return con.query(`SELECT * FROM users WHERE userId = ${id}`, function(err, result){
        if(err) {
            console.log("!!!!!!!!!!WIIIIIIIIIIIOOOOOOOOOOOOO ERROR POLICE !!!!!!!!!!!!!!!!!!!!!!!!!!");
            throw err;
            console.log("!!!!!!!!!!WIIIIIIIIIIIOOOOOOOOOOOOO ERROR POLICE !!!!!!!!!!!!!!!!!!!!!!!!!!");
        }
        //console.log(result);
        //console.log(result[0].name);
        //console.log(result[0].name);
        //return result;
        //console.log(saveResult(result));
        //console.log(saveResult(result)[0].name);
        return saveResult(result);
    })
}

function saveResult(result){
    var resultString = result;
    console.log("resultString: " + resultString)
    return resultString;
}

//fetchUser(1);
function getUserNameById(id){
    var name = "default";
    connectToDb();
    //return con.query(`SELECT name FROM users WHERE userId = ${id}`, function(err, result){
    con.query(`SELECT name FROM users WHERE userId = 1`, function(err, result){
        if(err) {
            throw err;
        } else {
            console.log(result[0].name);
            //return result[0].name;
            return result[0].name;
        }
    })
}
//getUserNameById(1);

function name(){
    return "defaultName";
}

function endConnection(){
    con.end();
}

module.exports.getRecipeByUser = getRecipesByUser;
module.exports.getUserNameById = getUserNameById;
module.exports.endConnection = endConnection;
module.exports.fetchUser = fetchUser;
module.exports.name = name;
module.exports.getUserName = getUserName;

function setUserId(resultId){
    userId = resultId;
}

function setRecipeList(resultList){
    recipelist = resultList;
}


//getRecipesByUser("hans");



