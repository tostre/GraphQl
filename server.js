// In der Datei wird ein einfacher Express-Server aufgesetzt
const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema.js");

const app = new express();

// Der Entry-Point für jeden Client der mit Graph interagieren will
app.use("/graphql", expressGraphQL({schema:schema, graphiql:true}));

app.listen(4000, function(){
    console.log("Server is running on port 4000");
})