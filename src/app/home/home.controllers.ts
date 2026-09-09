import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
//import { userTable } from "../auth/user.schema.js";
import { HomeServices } from "./home.services.js";
//import { AppError } from "../../core/error/AppError.js";

const homeService = new HomeServices()

export class HomeControllers{


    getHome = async (req: Request, res: Response) =>{
        try{
            const userId = Number(req.user?.userId);
            if(!userId){
                return res.redirect("/")
            }

            //OBS: Aqui a baixo fazer o retorno dos posts para jogar no redirect
            //Jogar em formato de Json apos o redirect de posts e coisa afins
            const userData = await homeService.findUserById(userId);
            if(!userData){
                res.clearCookie('token');
                return res.redirect('/');
            }

            return res.render('home-page-personal', {user: userData})

        }catch(error){
            return res.status(StatusCodes.UNAUTHORIZED).redirect('/')
        }

    }
}