//var db = require("./database");
var pdb = require("./pdatabase");
const{GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList,GraphQLID} = require("graphql")

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


const UserType = new GraphQLObjectType({
    name: "User",
    fields: {
        uId: {
            type: GraphQLID,
            resolve: (root, args, context, info) => {
                return args.uId;
            }
        },
        name: {
            type: GraphQLString,
            resolve: (root, args, context, info) => {
                //return pdb.getUserNameById(args.uId);
                //return db.getUserNameById(1);
                console.log("ROOT:")
                console.log(root);
                return root[0].name;
                //pdb.endConnection();
                //return pdb.name();
            }
        },
        rating: {
            type: GraphQLInt,
            resolve: (root, args, context, info) => {
                return 3;
            }
        }
    }
})

const RecipeType = new GraphQLObjectType({
    name: "Recipe",
    fields: {
        rId: {
            type: GraphQLID,
            resolve: (root, args, context, info) => {
                return 1;
            }
        },
        name: {
            type: GraphQLString,
            resolve: (root, args, context, info) => {
                return pdb.getUserNameById(args.uId);
            }
        },
        rating: {
            type: GraphQLInt,
            resolve: (root, args, context, info) => {
                return 3;
            }
        }
    }
})

// Construct a schema, using GraphQL schema language
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                type: UserType,
                args: {
                    uId: {type: GraphQLID},
                    name: {type: GraphQLString},
                    rating: {type: GraphQLInt}
                },
                resolve: (root, args, context, info) => {
                    con.query(`SELECT * FROM users WHERE userId = ${args.uId}`, function(err, result){
                        if(err) {throw err;}
                        else{
                            console.log("RESULTS: ")
                            console.log(result);
                            //return result;
                            return "HANNNES";
                        }
                    })
                }
            },
            recipe: {
                type: RecipeType,
                args: {
                    rId: {type: GraphQLID},
                    name: {type: GraphQLString},
                    rating: {type: GraphQLInt}
                },
                resolve: (root, args, context, info) => {
                    return 7;
                }
            }
        }
    })
})



// The root provides a resolver function for each API endpoint
var root = {
    name: () => {
        return 'Hello world!';
    },
};

















