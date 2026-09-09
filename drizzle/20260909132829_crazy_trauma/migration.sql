CREATE TABLE `users_table` (
	`id` int unsigned AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`tipo_user` varchar(50) NOT NULL,
	`date` varchar(50),
	`sexo` varchar(10),
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
--> statement-breakpoint
CREATE TABLE `comentarios` (
	`id` int unsigned AUTO_INCREMENT PRIMARY KEY,
	`post_id` int unsigned NOT NULL,
	`user_id` int unsigned NOT NULL,
	`text` text NOT NULL,
	`curtidas` int NOT NULL DEFAULT 0,
	`amei` int NOT NULL DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `post_table` (
	`id` int unsigned AUTO_INCREMENT PRIMARY KEY,
	`user_id` int unsigned NOT NULL,
	`posts` text NOT NULL,
	`curtidas` int NOT NULL DEFAULT 0,
	`amei` int NOT NULL DEFAULT 0
);
--> statement-breakpoint
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_post_id_post_table_id_fkey` FOREIGN KEY (`post_id`) REFERENCES `post_table`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `comentarios` ADD CONSTRAINT `comentarios_user_id_users_table_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE `post_table` ADD CONSTRAINT `post_table_user_id_users_table_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users_table`(`id`) ON DELETE CASCADE;