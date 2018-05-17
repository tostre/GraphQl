// In der Datei wird ein einfacher Express-Server aufgesetzt
const express = require("express");
const graphqlHTTP = require("express-graphql");
//const schema = require("./schema.js");
const schema = require("./gql.js");

const server = new express();

// Der Entry-Point für jeden Client der mit Graph interagieren will
server.use("/gql", graphqlHTTP({
    schema,
    graphiql: true
}));

// Erstellt einen Socket und hört auf jede Verbindung die über den 4000-Port kommt
server.listen(4000);
console.log("Listening ...");
//console.log("https://www.goodreads.com/author/show.xml?id=" + "4432" + "&key=P98BiGS1yOmkECv5mLmbtQ");
