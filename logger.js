var url = "http://mylogger.io/lognpm";

function log(message){
    // send an http request
    console.log(message);
}

module.id = "module_logger"
// Man fügt die Methode log unter dem Namen log dem Export hinzu, sodass andere Module darauf zugreifen können
module.exports.log = log;

console.log(module);