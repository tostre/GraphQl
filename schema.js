const fetch = require("node-fetch");
const xml = require("xml2js");
const util = require("util");
// ParseString braucht eig ein Callback, hiermit kann man das mit Promises machen
const parseXML = util.promisify(require("xml2js").parseString);

const goodReadsEmail = "ptt88475@mziqo.com";
const apiKey = "P98BiGS1yOmkECv5mLmbtQ";
const secretKey = "jXuw3fpErUvxzrU66Qz3r3uoI3TNsKDZQj81Rt2RQ";

const{
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList} = require("graphql")

var author = [4432, "Jessica Heiirl"];
var book = [];

// Führt einen https-Fetch aus
// Gibt ein response-(Promise)-Objekt zurück (das wird dann an die then-Funktion gegeben)
// then: Wird aufgerufen, wenn der asynchrone Task fertig ist.
// Man deinfiert eine Seucces- und eine Failure-Methode
// response => response.text() heißt "response" ist ein Prameter der Funktion und response.tex() der Rückgabewert
// Weil die text()-Funktion auch mit Promises arbeitet muss da auch ein then dran
// In x wird dann response.text gespeichert (weil der einen STinr zurück gitb
//const responseString2 = fetch("https://www.goodreads.com/author/show.xml?id=4432&key=P98BiGS1yOmkECv5mLmbtQ")
//    .then(response => response.text())
//    .then(parseXML);

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