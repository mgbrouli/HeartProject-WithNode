import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.services.js";
import { AppError } from "../../core/error/AppError.js";


const userService = new UserServices();

export class UserController {

    create = async (req: Request, res: Response) => {
        try {
            const result = await userService.create(req.body)

            if (!result) {
                return res.status(StatusCodes.BAD_REQUEST).json({ message: "Erro interno do servidor" })
            }
            return res.status(StatusCodes.CREATED).redirect('/')
        } catch (error: any) {
            if (error instanceof AppError) {
                return res.status(error.status).json({ message: error.message });
            }
        }
    }

    login = async(req: Request, res: Response) => {
        try{

            const {email, senha} = req.body
            if(!email || !senha){
                return res.status(StatusCodes.UNAUTHORIZED).json({message: "Campo digitado usuario ou senha invalidos"})
            }

            const result = await userService.login({email, senha});
            const EIGHT_HOURS_IN_MS = 1000 * 60 * 60 * 8;

            res.cookie('token', result.token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: EIGHT_HOURS_IN_MS
            })
            
            res.status(StatusCodes.PERMANENT_REDIRECT).redirect('/home')

        }catch(error: any){
            if(error instanceof AppError){
                return res.status(error.status).redirect('/')
            }
            return res.status(StatusCodes.UNAUTHORIZED).json({message: "Erro interno do servidor"})
        }
    }

    
}