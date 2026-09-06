import {mysqlTable, int, varchar} from 'drizzle-orm/mysql-core';


export const userTable = mysqlTable('users_table', {
    id: int().primaryKey().autoincrement(),
    name: varchar({length: 50}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    senha: varchar({length: 255}).notNull(),
    tipo_user: varchar({length: 50}).notNull(),
    date: varchar({length: 50}),
    sexo: varchar({length: 10}),
})