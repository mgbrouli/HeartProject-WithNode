import {mysqlTable, int,serial,varchar} from 'drizzle-orm/mysql-core';


export const userTable = mysqlTable('users_table', {
    id: int('id', {unsigned: true}).autoincrement().primaryKey(),
    name: varchar({length: 50}).notNull(),
    email: varchar({length: 255}).notNull().unique(),
    senha: varchar({length: 255}).notNull(),
    tipo_user: varchar({length: 50}).notNull(),
    date: varchar({length: 50}),
    sexo: varchar({length: 10}),
})