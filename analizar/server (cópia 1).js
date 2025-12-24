const express = require("express")
const App = express()
const db = require("./db")

App.use(express.urlencoded({extended: true}))

App.get("/", (req, res)=>{
    res.sendFile(__dirname + "/index.html")
})

App.post("/login", (req, res)=>{
    const username = req.body.login;
    const pass = req.body.pass;

    db.login(username, pass, (err, result)=>{
        if(err){
            console.error('Eurro ao autencticar: ', err);
            res.status(500).send("Erro ao processar a autenticação");
            return;
        }
        if(result){
            res.status(200).send("Login bem-sucedido");
        }else{
            res.status(401).send("Login ou senha incorrestos");
        }
    });
});

App.listen(3000, (req, res)=>{
    console.log("Servidor online")
})