import Router from 'express';
import { authMiddleWare } from '../../core/utilities/jwtMiddleware.js';
import {PostsControllers} from './posts.controller.js'

export const postRouter = Router()
const postController = new PostsControllers();


postRouter.post("/post/create", authMiddleWare, postController.create )
postRouter.post('/post/:postId/react', authMiddleWare, postController.toggleReaction)