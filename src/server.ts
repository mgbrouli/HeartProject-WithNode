import express from 'express';
import type { Request, Response } from 'express';

import path from 'path';
const __dirname = import.meta.dirname;
import { userRouter } from './app/auth/user.routers.js';
import { authMiddleWare } from './core/utilities/jwtMiddleware.js'

//const db = require("./db")

export const app = express();

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

app.use(express.static('src/views'))
app.use(express.urlencoded({extended:true}))

app.use('/api', userRouter)


//Routes of rendering pages

app.get('/', (req, res)=>{
    res.status(200).render('login')
     
})

app.get('/cadastro', (req: Request, res: Response)=>{
    res.render('cadastro')
})

app.get('/home_personal', authMiddleWare , (req, res)=>{
    res.render('home-page-personal')
})




