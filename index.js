process.title = "Heart | social";

const app = require('./src/server')
const port = 3000,
    host = "127.0.0.1";


var args = process.argv,
    potr = args[2] || port;

app.listen(port,host, ()=>{
    console.log(`Servidor online no site http:${host}:${port}`)
} )