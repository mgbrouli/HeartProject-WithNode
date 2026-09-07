import { userTable } from "./user.schema.js";
import { db } from "../../core/db/database.js";
import { eq } from "drizzle-orm";
import { AppError } from "../../core/error/AppError.js";
import { StatusCodes } from "http-status-codes";
import { hashGenerate } from "../../core/utilities/security.js";

type UserInsert = typeof userTable.$inferInsert;
type UserSelect = typeof userTable.$inferSelect;


export class UserServices {


    create = async (data: UserInsert) => {
        const [userExist] = await db.select().from(userTable).where(eq(userTable.email, data.email)).limit(1)

        if (userExist) {
            throw new AppError(StatusCodes.CONFLICT, "Usuário já existe")
        }
        const hashedPassword = await hashGenerate(data.senha)

        const [result] = await db.insert(userTable).values({ ...data, senha: hashedPassword });

        const [createdUser] = await db.select().from(userTable).where(eq(userTable.id, result.insertId));

        if (!createdUser) {
            throw new AppError(StatusCodes.INTERNAL_SERVER_ERROR, "Erro ao criar usuário");
        }

        const { senha, ...userWithoutPassword } = createdUser;

        return userWithoutPassword

    }


}
