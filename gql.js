const{GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,GraphQLID} = require("graphql")
const mysql = require("mysql");


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

var database = new Database();

const IngredientType = new GraphQLObjectType({
    name: "Ingredient",
    fields: {
        id: {
            type: GraphQLID,
            resolve: (root) => {
                return root[0].ingId;
            }
        },
        name: {
            type: GraphQLString,
            resolve: (root) => {
                return root[0].name;
            }
        }
    }
})

const RecipeType = new GraphQLObjectType({
    name: "Recipe",
    fields: {
        id: {
            type: GraphQLID,
            resolve: (root) => {
                return root[0].recipeId;
            }
        },
        name: {
            type: GraphQLString,
            resolve: (root) => {
                console.log("ROOT IM RECIPE");
                console.log(root);
                if(root.constructor == Array){
                    return root[0].name;
                } else {
                    return root.name;
                }

                //return root[0].name;
                //return root.name;
            }
        },
        rating: {
            type: GraphQLInt,
            resolve: (root) => {
                return root[0].rating;
            }
        }
    }
})

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        id: {
            type: GraphQLID,
            resolve: (root) => {
                return root[0].userId;
            }
        },
        name: {
            type: GraphQLString,
            resolve: (root) => {
                return root[0].name;
            }
        },
        rating: {
            type: GraphQLInt,
            resolve: (root) => {
                return root[0].rating;
            }
        },
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve: (root) => {
                return database.query(`SELECT recipeId FROM user_recipes WHERE userId = ${root[0].userId}`)
                    .then((rows) => {
                        var recipeIds = rows[0].recipeId;
                        for(var i = 0; i < rows.length-1; i++){
                            console.log("loop");
                            recipeIds += " OR recipeId = ";
                            recipeIds += rows[i+1].recipeId;
                            console.log(recipeIds);
                        }
                        return recipeIds;
                    }). then((recipeIds) => {
                        return database.query(`SELECT * FROM recipes WHERE recipeId = ${recipeIds}`);
                    }).then((rows) => {
                        console.log("recipes:");
                        console.log(rows);
                        console.log("root");
                        console.log(rows[0].name);

                        var recipes = [
                            {
                                recipeId: 1,
                                name: "reispfanne",
                                rating: 2
                            },
                            {
                                recipeId: 10,
                                name: "burger",
                                rating: 3
                            }
                        ]
                        return rows;
                    })
            }
        }
    }
})









module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: () => ({
            user: {
                type: UserType,
                args: {
                    id: {type: GraphQLInt},
                    name: {type: GraphQLString},
                    rating: {type: GraphQLInt}
                },
                resolve: (root, args) => {
                    return database.query(`SELECT * FROM users WHERE userId = ${args.id}`)
                        .then((rows) => {
                            return rows;
                        })
                }
            },
            recipe: {
                type: RecipeType,
                args: {
                    id: {type: GraphQLInt},
                    name: {type: GraphQLString},
                    rating: {type: GraphQLInt}
                },
                resolve: (root, args) => {
                    return database.query(`SELECT * FROM recipes WHERE recipeId = ${args.id}`)
                        .then((rows) => {
                            console.log(rows);
                            return rows;
                        })
                }
            },

            ingredient: {
                type: IngredientType,
                args: {
                    id: {type: GraphQLInt},
                    name: {type: GraphQLString}
                },
                resolve: (root, args) => {
                    return database.query(`SELECT * FROM ingredients WHERE ingId = ${args.id}`)
                        .then((rows) => {
                            return rows;
                        })
                }
            }

        })
    })
})




















