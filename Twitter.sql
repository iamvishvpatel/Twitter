-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 24, 2025 at 01:01 PM
-- Server version: 8.0.41-0ubuntu0.20.04.1
-- PHP Version: 7.4.3-4ubuntu2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Twitter`
--

-- --------------------------------------------------------

--
-- Table structure for table `Follows`
--

CREATE TABLE `Follows` (
  `FollowerID` bigint NOT NULL,
  `FolloweeID` bigint NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Follows`
--

INSERT INTO `Follows` (`FollowerID`, `FolloweeID`, `CreatedAt`) VALUES
(35, 1, '2025-03-19 13:56:11'),
(35, 4, '2025-03-18 10:53:36'),
(35, 8, '2025-03-18 09:03:13'),
(35, 16, '2025-03-19 10:27:22'),
(36, 1, '2025-03-21 09:12:16');

-- --------------------------------------------------------

--
-- Table structure for table `Likes`
--

CREATE TABLE `Likes` (
  `LikeID` bigint UNSIGNED NOT NULL,
  `TweetID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Likes`
--

INSERT INTO `Likes` (`LikeID`, `TweetID`, `UserID`, `CreatedAt`) VALUES
(78, 1, 36, '2025-03-20 07:34:38'),
(82, 2, 50, '2025-03-20 12:12:39'),
(83, 4, 50, '2025-03-20 12:17:18');

-- --------------------------------------------------------

--
-- Table structure for table `Retweets`
--

CREATE TABLE `Retweets` (
  `RetweetID` bigint UNSIGNED NOT NULL,
  `TweetID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Retweets`
--

INSERT INTO `Retweets` (`RetweetID`, `TweetID`, `UserID`, `CreatedAt`) VALUES
(17, 2, 36, '2025-03-20 06:19:37');

-- --------------------------------------------------------

--
-- Table structure for table `Tweets`
--

CREATE TABLE `Tweets` (
  `TweetID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `Content` text NOT NULL,
  `MediaURL` varchar(255) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Tweets`
--

INSERT INTO `Tweets` (`TweetID`, `UserID`, `Content`, `MediaURL`, `CreatedAt`) VALUES
(1, 35, 'My first tweet!', 'https://cdn.pixabay.com/photo/2022/03/21/02/08/land-7082135_1280.jpg', '2025-03-17 13:03:01'),
(2, 16, 'Hello from Sairaj123 !', 'https://english.mathrubhumi.com/image/contentid/policy:1.10079726:1731643982/Vikrant-Massey.jpg', '2025-03-18 12:04:55'),
(3, 35, 'Road Trip to Manali..!', 'https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2FCover-compressed.jpg%2FCover-compressed-1703738349904.jpg&w=2048&q=75', '2025-03-18 12:23:26'),
(4, 50, 'BMW Lover..!', 'https://t3.ftcdn.net/jpg/04/35/92/40/360_F_435924070_A2n5ZyQUF7nCRsYZj6SX1SAYOn5sggFh.jpg', '2025-03-20 12:16:09'),
(14, 55, 'Indian Prime Minister Narendra Modi speaks at a joint news conference with Australian Prime Minister Anthony Albanese (R) at Admiralty House on May 24, 2023 in Sydney, Australia.', 'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcQCyzdroOgXf1JRT-59-ejJoIE0a9KVvyVwXUrA5xytU8gCuncLXYXL3DO2b1_-YnaUWD0lgEsd3ddXvZg', '2025-03-21 09:37:52');

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` bigint NOT NULL,
  `Username` varchar(255) NOT NULL,
  `FirstName` varchar(255) NOT NULL,
  `LastName` varchar(255) NOT NULL,
  `Email` varchar(255) NOT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Bio` text,
  `ProfilePicture` varchar(255) DEFAULT NULL,
  `CreatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `Username`, `FirstName`, `LastName`, `Email`, `Password`, `Bio`, `ProfilePicture`, `CreatedAt`) VALUES
(1, 'vishv123', 'vishv', 'patel', 'v@vc.com', NULL, 'Proffesional Coder..!', NULL, '2025-03-11 07:51:39'),
(4, 'amos123', 'amos', 'khristri', 'k@kc.com', NULL, 'Proffesional Stacker..!', NULL, '2025-03-11 07:56:18'),
(8, 'parshav123', 'parshav', 'Andhariya', 'p@pc.com', NULL, 'Proffesional coder..!', NULL, '2025-03-11 08:40:26'),
(10, 'nepal123', 'nepal', 'Rajput', 'n@nc.com', NULL, 'Proffesional debugger..!', NULL, '2025-03-11 09:07:22'),
(16, 'sairaj123', 'sairaj', 'tailor', 's@sc.com', NULL, 'Proffesional Chu..!', NULL, '2025-03-11 09:13:58'),
(17, 'SFDHERTHEHYT', 'EGHYEG', 'ERTHY', 'ERT@GAMIL.COKM', NULL, 'DFYTJ', NULL, '2025-03-11 09:20:19'),
(21, 'SFDHERTHEDHYT', 'EGHYEG', 'ERTHY', 'GG@GMAIL.COM', NULL, 'DFYTJ', NULL, '2025-03-11 09:21:24'),
(25, 'Priyank123', 'Priyank', 'Dodiya', 'p@dc.com', NULL, 'Not Good Coder Only Fecuu...!', NULL, '2025-03-11 09:46:24'),
(26, 'Ansh123', 'Ansh', 'Vaghela', 'a@ac.com', NULL, 'Walekumm salam..!', NULL, '2025-03-11 10:03:34'),
(27, 'Vivek123', 'vivek', 'Ahir', 'v@vcc.com', NULL, 'Proffesional debugger..!', NULL, '2025-03-11 10:06:27'),
(28, 'Man123', 'Mann', 'Shah', 'm@mc.com', NULL, 'Proffesional Stacker..!', NULL, '2025-03-11 10:12:11'),
(30, 'sharad123', 'sharad', 'stetu', 'se@sc.com', NULL, 'Proffesional debugger..!', NULL, '2025-03-11 10:45:38'),
(31, 'jay123', 'jay', 'prajapati', 'j@jc.com', NULL, 'Proffesional Coder..!', NULL, '2025-03-11 11:14:08'),
(34, 'tej132', 'TEJ', 'Patel', 't@tc.com', NULL, 'Proffesional Coder..!', NULL, '2025-03-11 11:29:38'),
(35, 'raj123', 'Raj', 'Sunder', 'sundar@gmail.com', '$2b$10$yf8lyWgLS2h/GE3pWTYWSeiDkhAroVTX1AfrMgDyWrjsWzTAQHUTS', 'Web Developer | Tech Enthusiast', 'https://i.pinimg.com/736x/f4/e9/b1/f4e9b1b85276a53f6bf2762cb69fd223.jpg', '2025-03-17 05:51:38'),
(36, 'parshav143', 'parshav', 'andhariya', 'Parshav@gmail.com', '$2b$10$zBDQPa8G/o1DIm7Ba8SxtOE1XfJgavqvbHPtHYkbssD0JKp1wKZ3G', 'hello', NULL, '2025-03-20 04:32:58'),
(39, 'vishv12333', 'vishv', 'patel', 'v@vc.com5855', NULL, 'DFYTJ', NULL, '2025-03-20 09:39:42'),
(40, 'vishv1233', 'vishv', 'patel', 'v@vc.com58554', '$2b$10$sNGyrV2RTT49h7t1tqIsJOhOpu8295mCoEKpnMjaTm0nFM4OrnVSe', 'DFYTJ', 'file-1742464629429-493895908Screenshot from 2025-02-13 19-36-50.png', '2025-03-20 09:42:31'),
(42, 'Nepal1234', 'nepal', 'rajput', 'nn@nc.com', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-03 13-10-04.png', '2025-03-20 09:47:18'),
(43, 'Nepal12349', 'nepal', 'rajput', 'nn@nc.com9', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-03 13-10-04.png', '2025-03-20 09:49:18'),
(44, 'Nepal123497', 'nepal', 'rajput', 'nn@nc.com97', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-03 13-10-04.png', '2025-03-20 09:51:35'),
(45, 'hgfdhgf', 'hgfhgf', 'gfhgf', 'GgghG@GMAIL.COM', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-13 19-36-50.png', '2025-03-20 09:52:13'),
(46, 'hgfdhgfj', 'hgfhgf', 'gfhgf', 'jGgghG@GMAIL.COM', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-13 19-36-50.png', '2025-03-20 09:52:32'),
(47, 'hgfdhgfjhhf', 'hgfhgf', 'gfhgf', 'jGgghG@GMAIL.COMhghf', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-13 19-36-50.png', '2025-03-20 09:56:14'),
(48, 'hgfdhgfjhhfd', 'hgfhgf', 'gfhgf', 'jGgghG@GMAIL.COMhghfd', NULL, 'Proffesional Coder..!', 'Screenshot from 2025-02-13 19-36-50.png', '2025-03-20 09:56:51'),
(49, 'hgfdhgfjhhfdfd', 'hgfhgf', 'gfhgf', 'jGgghG@GMAIL.COMhghfdd', '$2b$10$2PcOEU5C2HCqinvF2vwbhOXPTevuxwicOO9/6HIwxAXNIr4F/vLUu', 'Proffesional Coder..!', 'Screenshot from 2025-02-13 19-36-50.png', '2025-03-20 09:57:09'),
(50, 'Tushar143', 'Tushar', 'Vaghela', 'tushar@gmail.com', '$2b$10$3gMMU.mYnrh./WORP3J3xu3yLUs0OZEU3HpLIyfIXWRudDXDBUAV2', 'Proffesional Coder..! ', 'file-1742472057160-588661971tushar.jpeg', '2025-03-20 12:00:57'),
(51, 'chintan', 'Chintan', 'Gor', 'chintan@gor.com', '$2b$10$wRJelae6aqq.ixGC9/2iKOS/QsKh5DuyeQ4O0L//Uy1OzQqZi3jh.', 'CTO', 'file-1742477846462-146327122chintansir.png', '2025-03-20 13:37:26'),
(53, 'Mann123', 'Mann', 'Shah', 'mann@gmail.com', '$2b$10$JIvdNmDxOCX.nfjJMJObc.KCew7QaHyDNgTzlN5Ei0UkigDB3fm9W', 'still stalking ', 'file-1742532836254-708491744profile.jpg', '2025-03-21 04:53:56'),
(55, 'iamnarendramodi', 'Narendra Damodardas', 'Modi', 'namo@gmail.com', '$2b$10$NJGR57fhWtYMFa0br2j.leavEjMZNRKrkbpB84ct99/JxVY1RWXA2', ' Prime Minister of India', 'file-1742549683542-477084414narendra Modi.jpeg', '2025-03-21 09:34:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Follows`
--
ALTER TABLE `Follows`
  ADD PRIMARY KEY (`FollowerID`,`FolloweeID`),
  ADD KEY `FolloweeID` (`FolloweeID`);

--
-- Indexes for table `Likes`
--
ALTER TABLE `Likes`
  ADD PRIMARY KEY (`LikeID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TweetID` (`TweetID`);

--
-- Indexes for table `Retweets`
--
ALTER TABLE `Retweets`
  ADD PRIMARY KEY (`RetweetID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TweetID` (`TweetID`);

--
-- Indexes for table `Tweets`
--
ALTER TABLE `Tweets`
  ADD PRIMARY KEY (`TweetID`),
  ADD KEY `Tweets_ibfk_1` (`UserID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Likes`
--
ALTER TABLE `Likes`
  MODIFY `LikeID` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `Retweets`
--
ALTER TABLE `Retweets`
  MODIFY `RetweetID` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `Tweets`
--
ALTER TABLE `Tweets`
  MODIFY `TweetID` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` bigint NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Follows`
--
ALTER TABLE `Follows`
  ADD CONSTRAINT `Follows_ibfk_2` FOREIGN KEY (`FolloweeID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `Follows_ibfk_3` FOREIGN KEY (`FollowerID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Likes`
--
ALTER TABLE `Likes`
  ADD CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`TweetID`) REFERENCES `Tweets` (`TweetID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Retweets`
--
ALTER TABLE `Retweets`
  ADD CONSTRAINT `Retweets_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `Retweets_ibfk_2` FOREIGN KEY (`TweetID`) REFERENCES `Tweets` (`TweetID`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Tweets`
--
ALTER TABLE `Tweets`
  ADD CONSTRAINT `Tweets_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
