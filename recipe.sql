-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 03, 2021 at 12:51 AM
-- Server version: 8.0.13-4
-- PHP Version: 7.2.24-0ubuntu0.18.04.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tllRmD1kgb`
--

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `ingredients` text COLLATE utf8_unicode_ci NOT NULL,
  `cooking_steps` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `recipe_photos` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
('Cbv6MvEv9tyCLmkjq4N8lvQVKiNW07EVQ', 'arkan', 'arkanayyasyi@gmail.com', 'LLYg/hUmxTt7D4rCPEdivU60+w8VMEU6pTIuZC9pg4A='),
('SFujCosa8rrySMLR4aJSfGi6krwoGCoOi', 'Arkan Fauzan Ayyasyi', 'arkanfauzanayyasyi@gmail.com', 'LLYg/hUmxTt7D4rCPEdivU60+w8VMEU6pTIuZC9pg4A='),
('Vb69NALcGAbo6yPyDCcrfraJegLX2E9nb', 'tes', 'tes@email.com', 'LLYg/hUmxTt7D4rCPEdivU60+w8VMEU6pTIuZC9pg4A='),
('ZbN7zj1ewLCNDVVNHk0sXe9bDM0GVnKam', 'fauzan', 'arkan@gmail.com', 'LLYg/hUmxTt7D4rCPEdivU60+w8VMEU6pTIuZC9pg4A='),
('ZbN7zj1ewLCNDVVNHk0sXe9bDM0GVnKMU', 'arkan', 'arkanfauzan@gmail.com', 'LLYg/hUmxTt7D4rCPEdivU60+w8VMEU6pTIuZC9pg4A=');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `recipes`
--
ALTER TABLE `recipes`
  ADD CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
