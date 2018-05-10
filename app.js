//require gibt das objekt zurück das von dem anderen modul exportiert wird
const logger = require("./logger.js");
// Dann kann man Methoden aus der Datei Logger aufrufen
logger.log("Hallo, das ist eine Logger-MEssage");
// Hier werden die Eigenschaften der Datei Logger ausgegeben
console.log(logger);


// Setzt die ID des Modules
module.id = "module_app";


logger.log("hi");

// Path ist ein eingebautes Core-Module
const path = require("path");
// gibt Speichert Infos über die aktuelle Datei
var pathObj = path.parse(__filename);
console.log(pathObj);

// Hier kann man Funktionen ausführen die mit dem OS zu tun haben
const os = require("os");
// Gibt den freien arbeitsspeicher aus
var freeMemory = os.freemem();
console.log("free memory" + freeMemory);

// ermöglicht Zugriff auf das Dateisystem
const files = require("fs");
// Gibt alle Dateien und Ordner im aktuellen Ordner aus
const directory = files.readdirSync("./");
console.log("current directory " + directory);

// Ermöglichgt es auf events zu reagieren
// EventEmiitor ist groß, weil das ein Klasse ist
const EventEmitter = require("events");
// Jetzt macht man aus der Klasse ein Objekt
const emitter = new EventEmitter();
// Listener der aufgreufen wird, wenn Emit angestoßen wird
// Parameter: Name des Events, Funktion die ausgeführt wird, wenn das Signal kommt
// .on ist das gleiche wie addListener
emitter.on("event1", function(arg){
    console.log("listener called");
    console.log(arg.id);
    console.log(arg.url);
});
// signalisiert dass ein Event stattgefunden hat. Der Listener hört auf den Namen des Events. Wird das dann hier
// gestartet, wird die FUnktion im Listener ausgeführt
// Parameter: Name des Events, man kann weitere Parameter bestimmen, die dann im Listerner verarbeitet werden
// werden dann über den arg-Parameter angenommen
emitter.emit("event1", {id: 1, url: "http://"});
