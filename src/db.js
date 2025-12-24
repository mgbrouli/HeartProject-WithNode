const mysql = require('mysql');

const HOST = '127.0.0.1'
const username = "root"
const password = ""
const database = "heart"

const connection = mysql.createConnection({
    host: HOST,
    user: username,
    password: password,
    database: database
});

connection.connect((err)=>{
    if(err){
        console.error("Erro de conexão", err)
        return;
    }
    console.log("Conexão bem sucedida")
})

function login(user, pass, callback){
    const query = `SELECT * FROM  info_login WHERE nome = ? AND senha = ?`;
    const dados = [user, pass]
    connection.query(query,dados,(error, result, fields)=>{
        if(error){
            callback(error, null)
            return;
        }
        
        if(result.length > 0){
            callback(null, true);
        }else{
            callback(null, false);
        }
        
    })
}

function cadastrar(nome, email,senha , tipo_user,data,sexo,callback){
    const query = `INSERT INTO info_login (nome, email, senha, tipo_user, data_niver, sexo) VALUES (?,?,?,?,?,?)`
    const values = [nome, email, senha, tipo_user, data, sexo]

    connection.query(query,values, (error, result, fields)=>{
        if(error){
            callback(error, false)
            return;
        }if(result){
        callback(result, true);
        }
    })
    connection.end();
}

module.exports = {
    login,
    cadastrar
}