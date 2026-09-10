import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
//import { userTable } from "../auth/user.schema.js";
import { HomeServices } from "./home.services.js";
import { PostsServices } from "../posts/posts.services.js";
//import { AppError } from "../../core/error/AppError.js";

const homeService = new HomeServices();
const postService = new PostsServices();

export class HomeControllers {


    getHome = async (req: Request, res: Response) => {
        try {
            const userId = Number(req.user?.userId);
            if (!userId || Number.isNaN(userId)) {
                return res.redirect("/")
                //return res.status(StatusCodes.UNAUTHORIZED).json({message: "Erro ao se conectar"})
            }

            //OBS: Aqui a baixo fazer o retorno dos posts para jogar no redirect
            //Jogar em formato de Json apos o redirect de posts e coisa afins
            const userData = await homeService.findUserById(userId);
            const posts = await postService.getAllPost();
            const userReactions = await postService.getReactionsByUserId(userId) ?? [];


            if (!userData) {
                res.clearCookie('token');

                return res.redirect('/');
                //return res.status(StatusCodes.UNAUTHORIZED).json({message: "Erro ao se conectar"})
            }

            const postComReacao = posts.map(post => {
                const reacaoDoUsuario = userReactions.find(r => r.postId === post.id);

                return {
                    ...post,
                    userReaction: reacaoDoUsuario ? reacaoDoUsuario.type : null
                };
            });

            return res.render('home-page-personal', { user: userData, posts: postComReacao })

        } catch (error) {
            return res.redirect('/')
        }

    }
}