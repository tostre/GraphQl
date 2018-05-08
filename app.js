//require gibt das objekt zurück das von dem anderen modul exportiert wird
const logger = require("./logger.js");
// Path ist ein eingebautes Core-Module
const path = require("path");

function sayHello(name){
    console.log("Hello " + name);
}

sayHello("Monika");
module.id = "module_app";
console.log(logger);

logger.log("hi");

// Nützliche Modules: File System, https, OS, Path, Process, Query Strings, Stream,
// git Speichert Infos über die aktuelle Datei
var pathObj = path.parse(__filename);
console.log(pathObj);