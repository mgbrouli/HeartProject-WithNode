import type { Request, Response } from "express";

import { PostsServices } from "./posts.services.js";
import { StatusCodes } from "http-status-codes";

const postService = new PostsServices();


export class PostsControllers {

    create = async (req: Request, res: Response) => {

        try {


            const userId = Number(req.user?.userId);
            const { text } = req.body;
            if (!text) {
                return res.status(StatusCodes.BAD_REQUEST).redirect('/home')
            }
            await postService.create({ userId, text })

            return res.status(StatusCodes.SEE_OTHER).redirect('/home')


        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect('/home')
        }
    }

    toggleReaction = async (req: Request, res: Response) => {
        try {
            const { postId } = req.params;
            const { type } = req.body;
            const userId = req.user?.userId;
            if (!userId) { return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Usuário não tem autenticação para curtir" }) }

            if (!['curtida', 'amei'].includes(type)) {
                return res.status(StatusCodes.BAD_REQUEST).json({ error: "Tipo de reação inválido. " })
            }

            const result = await postService.toggleReaction(String(postId), Number(userId), type);

            return res.status(StatusCodes.OK).json(result);

        } catch (error) {
            console.error("Erro no toggleReaction:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Erro interno no servidor." });
        
    }
}
}