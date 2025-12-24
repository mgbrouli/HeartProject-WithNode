process.title = "MyWebServer";

var args = process.argv, //process argv coloca em lista o processo utilizado pelo sistema, array
    port = args[2] || 7070, //porta 7070
    webServer = require('./server');

webServer.listen(port, function(){
    console.log('Server started at port ' + port);
});