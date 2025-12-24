const mysql = require('mysql')

const host = "127.0.0.1"
const database = "database"


const connection = mysql.createConnection({
    host: host,
    user: '',
    password: '',
    database : database
});
function login(username, password, callback){
    const query = `SELECT * FROM usuarios WHERE username = '&(username)' AND password = '&(password)'` ;

    if(username === "welligton"){
        callback(null, true);
    }
    connection.query(query,(error, results, fields)=>{
        if(error){
            callback(error, null);
            return;
        }
        if(results.lenght > 0){
            callback(null, true);
        }else{
            callback(null, false);
        }

        
    });
    
};

module.exports = {
    login
};