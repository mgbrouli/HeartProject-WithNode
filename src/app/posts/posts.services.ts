import { db } from "../../core/db/database.js";
import { and, eq } from "drizzle-orm";
import { AppError } from "../../core/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import { postTable, comentarioTable, postReactionTable } from './posts.schema.js';

type postType = typeof postTable.$inferInsert
type postExist = typeof postTable.$inferSelect
type comentarioType = typeof comentarioTable.$inferInsert


export class PostsServices {

    create = async (post: postType) => {
        const [newPost] = await db.insert(postTable).values(post).$returningId();

        if (!newPost) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Erro interno ao salvar post")
        }
        return newPost
    }

    comentPost = async (comentario: comentarioType, post: postExist) => {

        const [postExist] = await db.select().from(postTable).where(eq(postTable.id, String(comentario.postId))).limit(1);

        if (!postExist) {
            throw new AppError(StatusCodes.NOT_FOUND, "Este post não existe ou foi excluido")
        }
        const [newComentario] = await db.insert(comentarioTable).values(comentario);

        return newComentario;

    }

    getAllPost = async () => {
        try {


            const posts = await db.select().from(postTable)
            return posts
        } catch (error) {
            console.error("Erro ao buscar posts: " + error);
            throw error;
        }
    }

    toggleReaction = async (postId: string, userId: number, type: 'curtida' | 'amei') => {

        const [postExist] = await db.select().from(postTable).where(eq(postTable.id, postId)).limit(1);
        if (!postExist) {
            throw new AppError(StatusCodes.NOT_FOUND, "Este post não existe ou foi excluido");
        }

        const [existsReaction] = await db.select().from(postReactionTable)
            .where(and(eq(postReactionTable.postId, postId),
                eq(postReactionTable.userId, Number(userId)))).limit(1);

        if (!existsReaction) {
            await db.insert(postReactionTable).values({ postId, userId, type });

            return { action: 'created', type };
        }

        if (existsReaction.type === 'type') {
            await db.delete(postReactionTable).where(eq(postReactionTable.id, existsReaction.id));

            return { action: 'removed', type };
        } else {
            await db.update(postReactionTable).set({ type }).where(eq(postReactionTable.id, existsReaction.id));

            return { action: 'updated', type };
        }


    }

    getReactionsByUserId = async (userId: number): Promise<Array<{ id: string; postId: string; userId: number; type: string }>> => {
        const [result] = await db.select().from(postReactionTable).where(eq(postReactionTable.userId, userId))
        return (result ?? []) as Array<{ id: string; postId: string; userId: number; type: string }>;
    }


}