-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 26, 2017 at 10:40 AM
-- Server version: 5.5.58-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `grp115_IKS`
--

-- --------------------------------------------------------

--
-- Table structure for table `station`
--

CREATE TABLE IF NOT EXISTS `station` (
  `stationID` int(10) NOT NULL AUTO_INCREMENT,
  `coordsA` varchar(30) NOT NULL,
  `coordsL` varchar(30) NOT NULL,
  `location` varchar(30) NOT NULL,
  `type` varchar(1) NOT NULL,
  `description` varchar(50) NOT NULL,
  PRIMARY KEY (`stationID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Dumping data for table `station`
--

INSERT INTO `station` (`stationID`, `coordsA`, `coordsL`, `location`, `type`, `description`) VALUES
(1, '47.71457225467146', '10.314338207244873', 'Kempten', 'B', 'Firmensitz'),
(2, '47.72426740349347', '10.316848754882812', 'Kempten', 'A', 'Außenstelle'),
(3, '47.882828716292344', '10.6264343852617', 'Kaufbeuren', 'V', 'Außenstelle'),
(4, '47.98036221803081', '10.1788330078125', 'Memmingen', 'B', 'Außenstelle'),
(5, '47.694697038966076', '10.038070678710938', 'Isny', 'A', 'Außenstelle'),
(6, '47.77941861197757', '10.616891384124756', 'Marktoberdorf', 'A', 'Außenstelle'),
(7, '47.514634612973694', '10.26755619153846', 'Sonthofen', 'V', 'Außenstelle'),
(8, '47.41029678060909', '10.275293827580754', 'Oberstdorf', 'A', 'Außenstelle'),
(9, '47.554643912647045', '10.022393703984562', 'Oberstaufen', 'A', 'Außenstelle'),
(10, '47.560841627466885', '10.21770143561298', 'Immenstadt', 'A', 'Außenstelle'),
(11, '47.569648', '10.700432800000044', 'Füssen', 'B', 'Außenstelle'),
(12, '47.550241351721596', '9.69220304476039', 'Lindau', 'B', 'Außenstelle');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
