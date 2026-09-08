import { Router } from "express";

import { UserController } from "./user.controllers.js";

export const userRouter = Router()
const userController = new UserController()

userRouter.post("/auth", userController.create);
userRouter.post("/login", userController.login);