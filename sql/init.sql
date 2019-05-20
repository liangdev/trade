CREATE TABLE `user` (
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `phone` varchar(255) NOT NULL , 
    `password` varchar(255) NOT NULL , 
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`), 
    UNIQUE KEY `phone` (`phone`) USING BTREE
);

CREATE TABLE `order` (
    `id` int(11) NOT NULL AUTO_INCREMENT, 
    `user_id` int(11) NOT NULL , 
    `symbol` varchar(255) NOT NULL , 
    `price` float NOT NULL , 
    `type` varchar(255) NOT NULL , 
    `status` varchar(256) NOT NULL , 
    `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP, 
    `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);
