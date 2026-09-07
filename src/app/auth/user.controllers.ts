import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { userTable } from "./user.schema.js";
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
}