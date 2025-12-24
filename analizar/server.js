const { url } = require('inspector');

var http = require('http'),
    config = require('./config.json'),
    fileHandler = require('./filehandler'),
    //parse = require('url').parse,
    types = config.types,
    rootFolder = config.rootFolder,
    defaultIndex = config.defaultIndex,
    server;


module.exports = server = http.createServer();


server.on('request', onRequest);


function onRequest(req, res){
    var fileName = req.url,
    fullpath,
    extension;

if(fileName === '/' || fileName == ""){
    fileName = defaultIndex;
}

fullpath = rootFolder + fileName;
extension = fileName.substring(fileName.lastIndexOf('.')+ 1);

fileHandler(fullpath, function(data){
    res.writeHead(200, {
        'Content-Type': types[extension] || 'text/plain',
        'Content-Length': data.length
    });
    res.end(data);
}, function(err){
    res.writeHead(404);
    res.end();
});
}



