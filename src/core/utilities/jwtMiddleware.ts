import { verifyToken } from './jwtUtilities.js';
import type { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';


declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number,
                email: string
            }
        }
    }
}


export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Token não fornecido ou invalido"})
    }

    const [ ,token] = authHeader.split(' ');
    if(!token){
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Token malformado"});
    }
    try{
        const payload = verifyToken(token) as {userId: number, email: string};
        req.user = payload;
        next();
    }catch(error){
        console.error(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Token invalido ou expirado"})
    }


}