CREATE SCHEMA `challenge-interbanking`;

USE `challenge-interbanking`;

CREATE TABLE `Account_Types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_account_types_unique` (`id`),
  UNIQUE KEY `description_unique` (`description`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Accounts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_account_type` int NOT NULL,
  `cbu` varchar(40) NOT NULL,
  `alias` varchar(40) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_accounts_unique` (`id`),
  UNIQUE KEY `cbu_unique` (`cbu`),
  UNIQUE KEY `alias_unique` (`alias`),
  KEY `id_account_type_fk_idx` (`id_account_type`),
  CONSTRAINT `id_account_type_fk` FOREIGN KEY (`id_account_type`) REFERENCES `Account_Types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Companies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `create_date` datetime NOT NULL,
  `cuit` varchar(40) NOT NULL,
  `bussiness_name` varchar(40) NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `id_company_unique` (`id`),
   UNIQUE KEY `cuit_unique` (`cuit`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `id_account_source` int NOT NULL,
  `id_account_target` int NOT NULL,
  `id_company` int NOT NULL,
  `transfer_date` datetime NOT NULL,
   PRIMARY KEY (`id`),
   UNIQUE KEY `id_transaction_unique` (`id`),
   KEY `id_account_source_fk_idx` (`id_account_source`),
  CONSTRAINT `id_account_source_fk` FOREIGN KEY (`id_account_source`) REFERENCES `Accounts` (`id`),
  KEY `id_account_target_fk_idx` (`id_account_target`),
  CONSTRAINT `id_account_target_fk` FOREIGN KEY (`id_account_target`) REFERENCES `Accounts` (`id`),
   KEY `id_company_fk_idx` (`id_company`),
  CONSTRAINT `id_company_fk` FOREIGN KEY (`id_company`) REFERENCES `Companies` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE INDEX `idx_id_transaction` ON `Transactions`(id);
