const express = require('express')
const app = express();
const db = require("./db")


const host = '127.0.0.1';
const port = 3000;



module.exports = app;

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('src/views'))
app.use(express.urlencoded({extended:true}))



//Routes

app.get('/', (req, res)=>{
    res.render('login')
    res.statusCode = 200
  
})

app.get('/cadastro', (req, res)=>{
    res.render('cadastro')
})
app.get('/home_personal', (req, res)=>{
    res.render('home-page-personal')
})
app.post('/cadastro', (req, res)=>{
    const nome = req.body.nome;
    const email = req.body.email;
    const tipo = req.body.tipo;
    const data = req.body.data;
    const pass = req.body.pass;
    const pass2 = req.body.pass2;
    var senha =()=>{if(pass = pass2){return pass}else{res.end("As senhas estão diferentes")}}
    const sexo = 1
    if(tipo == "pessoal"){
        var tipot = 1
    }

    db.cadastrar(nome, email, pass, tipot, data,sexo,(err, result)=>{
        if(!result){
            console.error("Cadastro invalido",err)
            res.status(500).send("Cadastro invalido tente novamente");
            return;
        }
        if(result){
        res.status(200).render("login");
        }
    })

})



app.post('/login', (req, res)=>{
    const user = req.body.login;
    const pass = req.body.pass;

    db.login(user, pass, (err, result)=>{
        if(err){
            console.error("Erro ao autenticar", err);
            res.status(500).send("Erro ao processar autenticação");
            return;
        }

        if(result){
            res.status(200).render("home-page-personal");
        }else{
            res.status(401).send("Login ou senha incorretos");
        }
    })
    

})


app.get('/',(req, res)=>{
    console.log(req)

})



