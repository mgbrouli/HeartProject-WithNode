const express = require("express")
const App = express()
const db = require("./db")

App.use(express.urlencoded({extended: true}))
App.set('view engine', 'ejs');
App.set('views', __dirname + '/views')

App.get("/", (req, res)=>{
    res.render('index')
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
            //res.status(200).send("Login bem-sucedido");
            const userInfo = {
                username: username,
                email: "usuario@gmail.com",
                idade:30
            };
            
                res.render('usuario', {userInfo});
        }else{
            res.status(401).send("Login ou senha incorrestos");
        }

        

    });
});




App.listen(3000, (req, res)=>{
    console.log("Servidor online")
})