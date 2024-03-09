-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2023-07-28 13:56:42
-- 伺服器版本： 10.4.28-MariaDB
-- PHP 版本： 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `hire`
--

-- --------------------------------------------------------

--
-- 資料表結構 `tradeitemmap`
--

CREATE TABLE `tradeitemmap` (
  `tradeItemId` int(30) NOT NULL,
  `productId` varchar(30) NOT NULL,
  `rentStart` date NOT NULL,
  `rentEnd` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `tradeitemmap`
--

INSERT INTO `tradeitemmap` (`tradeItemId`, `productId`, `rentStart`, `rentEnd`) VALUES
(1, '1', '2023-07-03', '2023-07-10'),
(1, '17', '2023-07-03', '2023-07-10'),
(2, '36', '2023-07-12', '2023-07-14'),
(2, '8', '2023-07-12', '2023-07-14'),
(3, '28', '2023-07-01', '2023-07-04'),
(3, '43', '2023-07-01', '2023-07-04'),
(4, '23', '2023-07-22', '2023-07-23'),
(5, '2', '2023-07-12', '2023-07-14'),
(5, '29', '2023-07-12', '2023-07-14'),
(6, '24', '2023-07-21', '2023-07-23'),
(6, '29', '2023-07-21', '2023-07-23'),
(6, '44', '2023-07-21', '2023-07-23'),
(7, '19', '2023-07-07', '2023-07-14'),
(7, '25', '2023-07-07', '2023-07-14'),
(8, '22', '2023-07-29', '2023-07-30'),
(8, '27', '2023-07-29', '2023-07-30'),
(9, '14', '2023-07-19', '2023-07-30'),
(9, '16', '2023-07-19', '2023-07-30'),
(10, '17', '2023-07-28', '2023-07-31'),
(11, '13', '2023-08-15', '2023-08-15'),
(11, '35', '2023-08-07', '2023-08-15'),
(11, '6', '2023-08-13', '2023-08-16'),
(12, '5', '2023-08-20', '2023-08-22'),
(13, '26', '2023-08-21', '2023-08-23'),
(14, '30', '2023-08-07', '2023-08-16'),
(15, '13', '2023-08-21', '2023-08-23'),
(15, '33', '2023-08-13', '2023-08-17'),
(15, '6', '2023-08-06', '2023-08-09'),
(16, '14', '2023-08-06', '2023-08-09'),
(16, '7', '2023-08-06', '2023-08-09'),
(17, '5', '2023-08-06', '2023-08-09');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `tradeitemmap`
--
ALTER TABLE `tradeitemmap`
  ADD PRIMARY KEY (`tradeItemId`,`productId`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `tradeitemmap`
--
ALTER TABLE `tradeitemmap`
  MODIFY `tradeItemId` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
