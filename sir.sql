CREATE TABLE `user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(255) NOT NULL DEFAULT '' comment "昵称",
	`phone` CHAR(11) NOT NULL DEFAULT '' comment "手机号",
	`weapp_openid` VARCHAR(32) NOT NULL DEFAULT '' comment "小程序openid",
	`province` VARCHAR(20) NOT NULL DEFAULT '' comment "省",
	`city` VARCHAR(20) NULL DEFAULT NULL comment "城市",
	`gender` TINYINT NOT NULL DEFAULT '0' comment "性别",
	`avatar_url` VARCHAR(255) NOT NULL DEFAULT '' comment "头像",
	PRIMARY KEY (`id`)
)COMMENT='用户表'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;

CREATE TABLE `card` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL DEFAULT 0 comment "用户id",
	`content` VARCHAR(200) NOT NULL DEFAULT '' comment "内容",
	`image` VARCHAR(200) NOT NULL DEFAULT '' comment "图片",
	`praise` int(10) NOT NULL DEFAULT '0' comment "点赞",
	PRIMARY KEY (`id`)
)COMMENT='打卡表'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;


CREATE TABLE `test` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(30) NOT NULL DEFAULT '' ,
    `content` VARCHAR(255) NOT NULL DEFAULT '' ,
    `author` VARCHAR(30) NOT NULL DEFAULT '' ,
	PRIMARY KEY (`id`)
)COMMENT='测试表'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB;