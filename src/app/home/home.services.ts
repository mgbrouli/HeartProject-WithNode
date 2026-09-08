import { userTable } from "../auth/user.schema.js";
import { db } from "../../core/db/database.js";
import { eq } from "drizzle-orm";
import { AppError } from "../../core/error/AppError.js";
import { StatusCodes } from "http-status-codes";

export class HomeServices {


    findUserById = async (id: number) => {

        const [user] = await db.select().from(userTable).where(eq(userTable.id, id)).limit(1);

        if (!user) {
            throw new AppError(StatusCodes.UNAUTHORIZED, "Usuario invalido");
        }

        return user
    }
}