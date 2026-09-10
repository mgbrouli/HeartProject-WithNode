import { mysqlTable, serial, int, text } from 'drizzle-orm/mysql-core';
import { userTable } from '../auth/user.schema.js';
import {uuidv7} from 'uuidv7';
import { varchar } from 'drizzle-orm/cockroach-core';

export const postTable = mysqlTable('post_table', {
    id: varchar('id', {length:36}).$defaultFn(()=> uuidv7()).primaryKey(),
    userId: int('user_id', { unsigned: true }).notNull().references(() => userTable.id, { onDelete: 'cascade' }),
    text: text('posts').notNull(),
    curtidas: int('curtidas').default(0).notNull(),
    amei: int('amei').default(0).notNull(),


})


export const comentarioTable = mysqlTable('comentarios', {
    id: varchar('id', {length:36}).$defaultFn(()=> uuidv7()).primaryKey(),
    postId: varchar('post_id', { length: 56 }).notNull().references(() => postTable.id, { onDelete: 'cascade' }),
    userId: int('user_id', { unsigned: true }).notNull().references(() => userTable.id, { onDelete: 'cascade' }),
    text: text('text').notNull(),
    curtidas: int('curtidas').default(0).notNull(),
    amei: int('amei').default(0).notNull(),
})

export const postReactionTable = mysqlTable('post_reactions', {
    id: varchar('id', {length: 36}).$defaultFn(()=> uuidv7()).primaryKey(),
    postId: varchar('post_id', {length:36}).notNull(),
    userId: int('user_id', {unsigned: true}).notNull(),
    type: text('type').notNull(),
    
})