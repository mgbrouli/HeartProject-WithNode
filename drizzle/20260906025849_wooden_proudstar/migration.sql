CREATE TABLE `users_table` (
	`id` int AUTO_INCREMENT PRIMARY KEY,
	`name` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`senha` varchar(255) NOT NULL,
	`tipo_user` varchar(50) NOT NULL,
	`date` varchar(50),
	`sexo` varchar(10),
	CONSTRAINT `email_unique` UNIQUE INDEX(`email`)
);
