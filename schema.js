const fetch = require("node-fetch");
const xml = require("xml2js");
const util = require("util");
// ParseString braucht eig ein Callback, hiermit kann man das mit Promises machen
const parseXML = util.promisify(require("xml2js").parseString)
const goodReadsEmail = "ptt88475@mziqo.com";
const apiKey = "P98BiGS1yOmkECv5mLmbtQ";
const secretKey = "jXuw3fpErUvxzrU66Qz3r3uoI3TNsKDZQj81Rt2RQ";
const{GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require("graphql")



// Database ____________________________________________________________________________________________________________

var database = [
    var person1 = {
        id: 234,
        name: "Hannes",
        age: 32,
        booksWritten: ["Hannes Grillrezepte", "Das gelbe Kleid"]
    },

    var person2 = {
        id: 777,
        name: "Annegret",
        age: 67,
        booksWritten: ["Blumenziehen leicht gemacht", "Annegrets althergebrachtes Roboteröl"]
    },

    var person3 = {
        id: 78,
        name: "Lord Bookibook",
        age: 14,
        booksWritten: ["Haus im Wald", "Haus nicht im Wald"]
    }
]



// GQL Server __________________________________________________________________________________________________________

// Die resolve-Funktion wird aufgerufen, wenn jemand nach den Daten fragt (in dem Fall, wenn einer nach dem Autor fragt)
module.exports = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        description: "...",

        fields: () => ({
            author: {
                type: AuthorType,
                args: {
                    id: {type: GraphQLInt}
                },
                // In ARgs stehen bei einer Abfrage die Daten von oben drin (id in diesem Fall)
                // Die API ist ein Template Literal (erlaubt eingebettete Ausrücke, wie die Id)
                resolve: (root, args) => fetch(`https://www.goodreads.com/author/show.xml?id=${args.id}&key=P98BiGS1yOmkECv5mLmbtQ`)
                    .then(response => response.text())
                    .then(parseXML)
            },
            book:{
                type: BookType,
                args: {
                    id: {type: GraphQLInt},
                },
                resolve: (root, args) => fetch(`https://www.goodreads.com/book/show.xml?id=${args.id}&key=P98BiGS1yOmkECv5mLmbtQ`)
                    .then(response => response.text())
                    .then(parseXML)
            }
        })
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    description: "...",
    fields: () => ({
        name: {
            type: GraphQLString,
            resolve: xml => xml.GoodreadsResponse.author[0].name[0]
        },
        book: {
            type: BookType
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: xml => xml.GoodreadsResponse.author[0].books[0].book
        }
    })
})

const BookType = new GraphQLObjectType({
    name: "Book",
    description: "...",
    fields: () => ({
        title: {
            type: GraphQLString,
            resolve: xml => xml.GoodreadsResponse.book[0].title[0]

        },
        isbn: {
            type: GraphQLString,
            resolve: xml => xml.GoodreadsResponse.book[0].isbn[0]
        }
    })
})

