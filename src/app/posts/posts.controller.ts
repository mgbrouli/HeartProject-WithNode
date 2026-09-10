import type { Request, Response } from "express";

import { PostsServices } from "./posts.services.js";
import { StatusCodes } from "http-status-codes";

const postService = new PostsServices();

export class PostsControllers{
    
    create = async (req: Request, res: Response) =>{

        try{

        
        const userId = Number(req.user?.userId);
        const { text } = req.body;
        if(!text){
            return res.status(StatusCodes.BAD_REQUEST).redirect('/home')
        }
    await postService.create({userId, text} )

    return res.status(StatusCodes.SEE_OTHER).redirect('/home')

    
    }catch(error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect('/home')
    }
    }

}