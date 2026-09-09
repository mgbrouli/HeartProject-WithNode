import { mysqlTable, serial, int, text } from 'drizzle-orm/mysql-core';
import { userTable } from '../auth/user.schema.js';


export const postTable = mysqlTable('post_table', {
    id: int('id', {unsigned: true}).autoincrement().primaryKey(),
    userId: int('user_id', { unsigned: true }).notNull().references(() => userTable.id, { onDelete: 'cascade' }),
    text: text('posts').notNull(),
    curtidas: int('curtidas').default(0).notNull(),
    amei: int('amei').default(0).notNull(),


})


export const comentarioTable = mysqlTable('comentarios', {
    id: int('id', {unsigned:true}).autoincrement().primaryKey(),
    postId: int('post_id', { unsigned: true }).notNull().references(() => postTable.id, { onDelete: 'cascade' }),
    userId: int('user_id', { unsigned: true }).notNull().references(() => userTable.id, { onDelete: 'cascade' }),
    text: text('text').notNull(),
    curtidas: int('curtidas').default(0).notNull(),
    amei: int('amei').default(0).notNull(),
})