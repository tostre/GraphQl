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

const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        uId: {
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
        }
    }
})

const RecipeType = new GraphQLObjectType({
    name: "Recipe",
    fields: {
        rId: {
            type: GraphQLID,
            resolve: (root) => {
                return root[0].recipeId;
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
        }
    }
})

const IngredientType = new GraphQLObjectType({
    name: "Ingredient",
    fields: {
        ingId: {
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





module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: () => ({
            user: {
                type: UserType,
                args: {
                    uId: {type: GraphQLInt},
                    name: {type: GraphQLString},
                    rating: {type: GraphQLInt}
                },
                resolve: (root, args) => {
                    return database.query(`SELECT * FROM users WHERE userId = ${args.uId}`)
                        .then((rows) => {
                            return rows;
                        })
                }
            },
            recipe: {
                type: RecipeType,
                args: {
                    rId: {type: GraphQLInt},
                    name: {type: GraphQLString},
                    rating: {type: GraphQLInt}
                },
                resolve: (root, args) => {
                    return database.query(`SELECT * FROM recipes WHERE recipeId = ${args.rId}`)
                        .then((rows) => {
                            return rows;
                        })
                }
            },

            ingredient: {
                type: IngredientType,
                args: {
                    ingId: {type: GraphQLInt},
                    name: {type: GraphQLString}
                },
                resolve: (root, args) => {
                    return database.query(`SELECT * FROM ingredients WHERE ingId = ${args.ingId}`)
                        .then((rows) => {
                            return rows;
                        })
                }
            }

        })
    })
})




















