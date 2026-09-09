import express from 'express';
import cookieParser from 'cookie-parser';
import type { Request, Response } from 'express';

import path from 'path';
const __dirname = import.meta.dirname;
import { userRouter } from './app/auth/user.routers.js';
import { authMiddleWare } from './core/utilities/jwtMiddleware.js'
import { homeRouter } from './app/home/home.routers.js';


//const db = require("./db")

export const app = express();

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
app.use(cookieParser())

app.use(express.static('src/views'))
app.use(express.urlencoded({extended:true}))

app.use('/api', userRouter)
app.use('/', homeRouter)

//Routes of rendering pages

app.get('/', (req, res)=>{
    res.status(200).render('auth/login')
     
})

app.get('/cadastro', (req: Request, res: Response)=>{
    res.render('auth/cadastro')
})






