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
    let token: string | undefined;

    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        const [, headerToken] = req.headers.authorization.split(' ')
        token = headerToken;

    }
   
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token não fornecido ou inválido" });
    }
    try {
        const payload = verifyToken(token) as { userId: number, email: string };
        req.user = payload;
        next();
    } catch (error) {
        console.error(error);
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token invalido ou expirado" })
    }


}