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
        console.log(result);
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
            console.log(userId);
            con.query(`SELECT recipeId FROM user_recipes WHERE userId = ` + result[0].userId, function(err, result){
                if(err) throw err;
                console.log(result);

                // JETZT MUSS FÜR JEDEN EINTRAG IM ARRAY DAS REZEPT AUSGELESEN WERDEN
            })

        })
    } else {
        console.log("You have to provide a user name or id");
    }
}

function setUserId(resultId){
    userId = resultId;
}

function setRecipeList(resultList){
    recipelist = resultList;
}


getRecipesByUser("hans");



