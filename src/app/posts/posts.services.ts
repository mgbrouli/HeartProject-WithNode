import { db } from "../../core/db/database.js";
import { eq } from "drizzle-orm";
import { AppError } from "../../core/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import {postTable, comentarioTable} from './posts.schema.js';

type postType = typeof postTable.$inferInsert
type comentarioType = typeof comentarioTable.$inferInsert


export class PostsServices{

    create = async(post: postType) =>{
        const [newPost] = await db.insert(postTable).values(post).$returningId();

        if(!newPost){
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Erro interno ao salvar post")
        }
        return newPost
    }

    getAllPost = async () =>{
        const posts = await db.select().from(postTable)

        return posts
    }
}