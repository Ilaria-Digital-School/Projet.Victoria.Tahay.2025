-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 27 mars 2025 à 08:15
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `l_opale_blanche`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact`
--

DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `telephone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `subject` varchar(150) COLLATE utf8mb4_general_ci NOT NULL,
  `message` text COLLATE utf8mb4_general_ci NOT NULL,
  `date_envoi` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `telephone`, `subject`, `message`, `date_envoi`) VALUES
(9, 'Ali Baba', 'alibaba.31@gmail.com', '0770106336', 'Bonjour', 'Mon message', '2025-03-14 14:44:23'),
(7, 'Tahay Victoria', 'victoria.tahay@gmail.com', '', 'Bonjour', 'Hello !', '2025-02-26 17:36:05'),
(8, 'John', 'victoria.tahay@gmail.com', '0700000000', 'Hello', 'Hello World !', '2025-02-27 10:19:25'),
(10, 'John', 'victoria.tahay@gmail.com', '0700000000', 'Hello', 'SALUTTTT', '2025-03-14 14:47:45');

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `expires_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `password_resets`
--

INSERT INTO `password_resets` (`id`, `email`, `token`, `expires_at`) VALUES
(1, 'victoria.tahay@gmail.com', '6f2f92da32f83a883d8b8c5c0b312f69798e5b621e0d61285d5764111e4dbbfe', '2025-03-21 17:42:02'),
(2, 'victoria.tahay@gmail.com', '9db00fdb9a9b5b75fe940bd0cdc6ef78870ab0233f202b2f2a1abd3edf9fd8d6', '2025-03-21 17:42:52'),
(3, 'victoria.tahay@gmail.com', '3c82e0490d6f5e85401fea3640fd814b0245c80f2b4ceff1aede1917183e2493', '2025-03-21 17:50:50'),
(4, 'victoria.tahay@gmail.com', 'a202f53beb3b2c3f878735d30ea467adc7e8a106283a6ccfd1d0034c2dd1b9b9', '2025-03-21 18:09:34'),
(5, 'victoria.tahay@gmail.com', '668b04dccfb7ad6a98909b42d8cd6dd026ddd8345e99196e79ab756d4ccd994d', '2025-03-21 18:09:40');

-- --------------------------------------------------------

--
-- Structure de la table `reservations`
--

DROP TABLE IF EXISTS `reservations`;
CREATE TABLE IF NOT EXISTS `reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `servicename` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_resa` date NOT NULL,
  `time_slot` time DEFAULT NULL,
  `people` int NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `slot_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=159 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `service_id`, `category`, `servicename`, `date_resa`, `time_slot`, `people`, `price`, `created_at`, `slot_id`) VALUES
(152, 16, 14, 'Soins et massages', '', '2025-03-12', '19:00:00', 2, NULL, '2025-03-14 13:08:24', 0),
(153, 16, 3, 'Restaurant', '', '2025-03-19', '18:30:00', 5, NULL, '2025-03-14 13:10:07', 0),
(158, 19, 13, 'Soins et massages', '', '2025-04-04', '10:00:00', 2, NULL, '2025-03-19 14:15:47', 0),
(157, 19, 4, 'Spa', '', '2025-03-20', '16:00:00', 4, NULL, '2025-03-19 14:15:36', 0);

-- --------------------------------------------------------

--
-- Structure de la table `services`
--

DROP TABLE IF EXISTS `services`;
CREATE TABLE IF NOT EXISTS `services` (
  `service_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category` varchar(50) COLLATE utf8mb4_general_ci NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `duration` varchar(50) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `max_capacity` int NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `services`
--

INSERT INTO `services` (`service_id`, `name`, `category`, `price`, `duration`, `description`, `max_capacity`) VALUES
(1, 'Petit-Déjeuner', 'Restaurant', 0.00, NULL, NULL, 30),
(2, 'Déjeuner', 'Restaurant', 0.00, NULL, NULL, 30),
(3, 'Dîner', 'Restaurant', 0.00, NULL, NULL, 30),
(4, 'Réserver un accès', 'Spa', 45.00, '', NULL, 10),
(5, 'Soin hydratant visage', 'Soins et massages', 80.00, NULL, NULL, 2),
(6, 'Soin purifiant visage', 'Soins et massages', 80.00, NULL, NULL, 2),
(7, 'Soin anti-âge visage', 'Soins et massages', 80.00, NULL, NULL, 2),
(8, 'Soin revitalisant corps', 'Soins et massages', 80.00, NULL, NULL, 2),
(9, 'Gommage corps', 'Soins et massages', 80.00, NULL, NULL, 2),
(10, 'Enveloppement détoxifiant', 'Soins et massages', 80.00, NULL, NULL, 2),
(11, 'Massage relaxant', 'Soins et massages', 80.00, NULL, NULL, 2),
(12, 'Massage aux pierres chaudes', 'Soins et massages', 80.00, NULL, NULL, 2),
(13, 'Massage suédois', 'Soins et massages', 80.00, NULL, NULL, 2),
(14, 'Massage sportif', 'Soins et massages', 80.00, NULL, NULL, 2),
(15, 'Massage aromathérapie', 'Soins et massages', 80.00, NULL, NULL, 2),
(16, 'Massage aux pochons d’herbes', 'Soins et massages', 80.00, NULL, NULL, 2);

-- --------------------------------------------------------

--
-- Structure de la table `slots`
--

DROP TABLE IF EXISTS `slots`;
CREATE TABLE IF NOT EXISTS `slots` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `service_id` int NOT NULL,
  `sous_service` int DEFAULT NULL,
  `time_slot` time NOT NULL,
  `personne_num` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `service_id` (`service_id`)
) ENGINE=MyISAM AUTO_INCREMENT=172 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `slots`
--

INSERT INTO `slots` (`id`, `user_id`, `service_id`, `sous_service`, `time_slot`, `personne_num`) VALUES
(1, 0, 4, NULL, '09:00:00', 10),
(2, 0, 4, NULL, '10:00:00', 10),
(3, 0, 4, NULL, '11:00:00', 10),
(4, 0, 4, NULL, '12:00:00', 10),
(5, 0, 4, NULL, '13:00:00', 10),
(6, 0, 4, NULL, '14:00:00', 10),
(7, 0, 4, NULL, '15:00:00', 10),
(8, 0, 4, NULL, '16:00:00', 10),
(9, 0, 4, NULL, '17:00:00', 10),
(10, 0, 4, NULL, '18:00:00', 10),
(11, 0, 4, NULL, '19:00:00', 10),
(12, 0, 5, NULL, '09:00:00', 2),
(13, 0, 5, NULL, '10:00:00', 2),
(14, 0, 5, NULL, '11:00:00', 2),
(15, 0, 5, NULL, '12:00:00', 2),
(16, 0, 5, NULL, '13:00:00', 2),
(17, 0, 5, NULL, '14:00:00', 2),
(18, 0, 5, NULL, '15:00:00', 2),
(19, 0, 5, NULL, '16:00:00', 2),
(20, 0, 5, NULL, '17:00:00', 2),
(21, 0, 5, NULL, '18:00:00', 2),
(22, 0, 5, NULL, '19:00:00', 2),
(23, 0, 1, NULL, '07:00:00', 16),
(24, 0, 1, NULL, '07:30:00', 16),
(25, 0, 1, NULL, '08:00:00', 16),
(26, 0, 1, NULL, '08:30:00', 16),
(27, 0, 1, NULL, '09:00:00', 16),
(28, 0, 1, NULL, '09:30:00', 16),
(29, 0, 2, NULL, '12:00:00', 16),
(30, 0, 2, NULL, '12:30:00', 16),
(31, 0, 2, NULL, '13:00:00', 16),
(32, 0, 2, NULL, '13:30:00', 16),
(33, 0, 2, NULL, '14:00:00', 16),
(34, 0, 3, NULL, '18:30:00', 16),
(35, 0, 3, NULL, '19:00:00', 16),
(36, 0, 3, NULL, '19:30:00', 16),
(37, 0, 3, NULL, '20:00:00', 16),
(38, 0, 3, NULL, '20:30:00', 16),
(39, 0, 3, NULL, '21:00:00', 16),
(40, 0, 16, NULL, '09:00:00', 2),
(41, 0, 15, NULL, '09:00:00', 2),
(42, 0, 14, NULL, '09:00:00', 2),
(43, 0, 13, NULL, '09:00:00', 2),
(44, 0, 12, NULL, '09:00:00', 2),
(45, 0, 11, NULL, '09:00:00', 2),
(46, 0, 10, NULL, '09:00:00', 2),
(47, 0, 9, NULL, '09:00:00', 2),
(48, 0, 8, NULL, '09:00:00', 2),
(49, 0, 7, NULL, '09:00:00', 2),
(50, 0, 6, NULL, '09:00:00', 2),
(51, 0, 5, NULL, '09:00:00', 2),
(52, 0, 16, NULL, '10:00:00', 2),
(53, 0, 15, NULL, '10:00:00', 2),
(54, 0, 14, NULL, '10:00:00', 2),
(55, 0, 13, NULL, '10:00:00', 2),
(56, 0, 12, NULL, '10:00:00', 2),
(57, 0, 11, NULL, '10:00:00', 2),
(58, 0, 10, NULL, '10:00:00', 2),
(59, 0, 9, NULL, '10:00:00', 2),
(60, 0, 8, NULL, '10:00:00', 2),
(61, 0, 7, NULL, '10:00:00', 2),
(62, 0, 6, NULL, '10:00:00', 2),
(63, 0, 5, NULL, '10:00:00', 2),
(64, 0, 16, NULL, '11:00:00', 2),
(65, 0, 15, NULL, '11:00:00', 2),
(66, 0, 14, NULL, '11:00:00', 2),
(67, 0, 13, NULL, '11:00:00', 2),
(68, 0, 12, NULL, '11:00:00', 2),
(69, 0, 11, NULL, '11:00:00', 2),
(70, 0, 10, NULL, '11:00:00', 2),
(71, 0, 9, NULL, '11:00:00', 2),
(72, 0, 8, NULL, '11:00:00', 2),
(73, 0, 7, NULL, '11:00:00', 2),
(74, 0, 6, NULL, '11:00:00', 2),
(75, 0, 5, NULL, '11:00:00', 2),
(76, 0, 16, NULL, '12:00:00', 2),
(77, 0, 15, NULL, '12:00:00', 2),
(78, 0, 14, NULL, '12:00:00', 2),
(79, 0, 13, NULL, '12:00:00', 2),
(80, 0, 12, NULL, '12:00:00', 2),
(81, 0, 11, NULL, '12:00:00', 2),
(82, 0, 10, NULL, '12:00:00', 2),
(83, 0, 9, NULL, '12:00:00', 2),
(84, 0, 8, NULL, '12:00:00', 2),
(85, 0, 7, NULL, '12:00:00', 2),
(86, 0, 6, NULL, '12:00:00', 2),
(87, 0, 5, NULL, '12:00:00', 2),
(88, 0, 16, NULL, '13:00:00', 2),
(89, 0, 15, NULL, '13:00:00', 2),
(90, 0, 14, NULL, '13:00:00', 2),
(91, 0, 13, NULL, '13:00:00', 2),
(92, 0, 12, NULL, '13:00:00', 2),
(93, 0, 11, NULL, '13:00:00', 2),
(94, 0, 10, NULL, '13:00:00', 2),
(95, 0, 9, NULL, '13:00:00', 2),
(96, 0, 8, NULL, '13:00:00', 2),
(97, 0, 7, NULL, '13:00:00', 2),
(98, 0, 6, NULL, '13:00:00', 2),
(99, 0, 5, NULL, '13:00:00', 2),
(100, 0, 16, NULL, '14:00:00', 2),
(101, 0, 15, NULL, '14:00:00', 2),
(102, 0, 14, NULL, '14:00:00', 2),
(103, 0, 13, NULL, '14:00:00', 2),
(104, 0, 12, NULL, '14:00:00', 2),
(105, 0, 11, NULL, '14:00:00', 2),
(106, 0, 10, NULL, '14:00:00', 2),
(107, 0, 9, NULL, '14:00:00', 2),
(108, 0, 8, NULL, '14:00:00', 2),
(109, 0, 7, NULL, '14:00:00', 2),
(110, 0, 6, NULL, '14:00:00', 2),
(111, 0, 5, NULL, '14:00:00', 2),
(112, 0, 16, NULL, '15:00:00', 2),
(113, 0, 15, NULL, '15:00:00', 2),
(114, 0, 14, NULL, '15:00:00', 2),
(115, 0, 13, NULL, '15:00:00', 2),
(116, 0, 12, NULL, '15:00:00', 2),
(117, 0, 11, NULL, '15:00:00', 2),
(118, 0, 10, NULL, '15:00:00', 2),
(119, 0, 9, NULL, '15:00:00', 2),
(120, 0, 8, NULL, '15:00:00', 2),
(121, 0, 7, NULL, '15:00:00', 2),
(122, 0, 6, NULL, '15:00:00', 2),
(123, 0, 5, NULL, '15:00:00', 2),
(124, 0, 16, NULL, '16:00:00', 2),
(125, 0, 15, NULL, '16:00:00', 2),
(126, 0, 14, NULL, '16:00:00', 2),
(127, 0, 13, NULL, '16:00:00', 2),
(128, 0, 12, NULL, '16:00:00', 2),
(129, 0, 11, NULL, '16:00:00', 2),
(130, 0, 10, NULL, '16:00:00', 2),
(131, 0, 9, NULL, '16:00:00', 2),
(132, 0, 8, NULL, '16:00:00', 2),
(133, 0, 7, NULL, '16:00:00', 2),
(134, 0, 6, NULL, '16:00:00', 2),
(135, 0, 5, NULL, '16:00:00', 2),
(136, 0, 16, NULL, '17:00:00', 2),
(137, 0, 15, NULL, '17:00:00', 2),
(138, 0, 14, NULL, '17:00:00', 2),
(139, 0, 13, NULL, '17:00:00', 2),
(140, 0, 12, NULL, '17:00:00', 2),
(141, 0, 11, NULL, '17:00:00', 2),
(142, 0, 10, NULL, '17:00:00', 2),
(143, 0, 9, NULL, '17:00:00', 2),
(144, 0, 8, NULL, '17:00:00', 2),
(145, 0, 7, NULL, '17:00:00', 2),
(146, 0, 6, NULL, '17:00:00', 2),
(147, 0, 5, NULL, '17:00:00', 2),
(148, 0, 16, NULL, '18:00:00', 2),
(149, 0, 15, NULL, '18:00:00', 2),
(150, 0, 14, NULL, '18:00:00', 2),
(151, 0, 13, NULL, '18:00:00', 2),
(152, 0, 12, NULL, '18:00:00', 2),
(153, 0, 11, NULL, '18:00:00', 2),
(154, 0, 10, NULL, '18:00:00', 2),
(155, 0, 9, NULL, '18:00:00', 2),
(156, 0, 8, NULL, '18:00:00', 2),
(157, 0, 7, NULL, '18:00:00', 2),
(158, 0, 6, NULL, '18:00:00', 2),
(159, 0, 5, NULL, '18:00:00', 2),
(160, 0, 16, NULL, '19:00:00', 2),
(161, 0, 15, NULL, '19:00:00', 2),
(162, 0, 14, NULL, '19:00:00', 2),
(163, 0, 13, NULL, '19:00:00', 2),
(164, 0, 12, NULL, '19:00:00', 2),
(165, 0, 11, NULL, '19:00:00', 2),
(166, 0, 10, NULL, '19:00:00', 2),
(167, 0, 9, NULL, '19:00:00', 2),
(168, 0, 8, NULL, '19:00:00', 2),
(169, 0, 7, NULL, '19:00:00', 2),
(170, 0, 6, NULL, '19:00:00', 2),
(171, 0, 5, NULL, '19:00:00', 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nameuser` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `firstname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `birthday` date NOT NULL,
  `phone` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `adress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `zipcode` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `city` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `role` varchar(50) COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nameuser`, `firstname`, `birthday`, `phone`, `adress`, `zipcode`, `city`, `email`, `password`, `role`) VALUES
(9, 'Tahay', 'Victoria', '1998-07-06', '0770106336', '20 rue de l\'Est', '01000', 'Bourg-en-Bresse', 'victoria.tahay@gmail.com', '$2y$10$NQJ3mfDaheK8PeThqcCltOczhoRcnou8O0DuGWSV5DRPrm/5xG3Aq', 'admin'),
(10, 'Doe', 'John', '1998-07-06', '0606060606', '12 rue des hirondelels', '01000', 'Bourg-en-Bresse', 'victoria.tahay1@gmail.com', '$2y$10$gVaweRnFmJ0geFunjq18HO6juHuv86XfIlkj6W9j9Sh0pdfz3vga.', 'user'),
(18, 'Lotus', 'Chantal', '1965-01-08', '0770102041', '10 rue du spa', '01000', 'Bourg-en-Bresse', 'provider.spa@gmail.com', '$2y$10$JFPuBptWObIPYumtdxVY6O.uYG.kH4Dl2f1aBmsr.fv0FnkyvQFgq', 'provider_spa'),
(17, 'Gusteau', 'Auguste', '1980-04-14', '0606061220', '4 rue des étoiles', '01000', 'Bourg-en-Bresse', 'provider.restaurant@gmail.com', '$2y$10$9TpH3GfLeEA/yNhmdgwOqOy4mHdtCmvhUH1K3Mp38e4Vbmha0U.aW', 'provider_restaurant'),
(16, 'Baba', 'Ali', '1990-07-07', '0760601204', '20 rue des fleurs', '31000', 'Toulouse', 'alibaba.31@gmail.com', '$2y$10$5MyvtAuuBpgsgLhQHu/uvuzkkK/Hg7Rww//gv7uk1SAEyBTTh.Ai.', 'user'),
(19, 'Nelssen', 'Jack', '1978-03-01', '0606060606', '123 Route des Sommets', '74120', 'Megève', 'admin.lopaleblanche@gmail.com', '$2y$10$xTq8OP4ny33eCmKmCvWWCuWOQPqU7ORUYcdjEVzxGlrBMyQvS268O', 'admin');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
