import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "CHave_super_secreta_teste";

interface TokenPayload{
    userId: number;
    email: string;
}


export const generateToken = (payload: TokenPayload): string =>{
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '8h'});
}

export const verifyToken = (token: string): TokenPayload =>{
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
}