import { Router } from "express";
import { authMiddleWare } from "../../core/utilities/jwtMiddleware.js"
import { HomeControllers } from "./home.controllers.js";

const homeController = new HomeControllers();
export const homeRouter = Router()




homeRouter.get("/home", authMiddleWare, homeController.getHome)