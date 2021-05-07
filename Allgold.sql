-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 07. Mai 2021 um 12:23
-- Server-Version: 5.7.33-0ubuntu0.16.04.1
-- PHP-Version: 7.0.33-0ubuntu0.16.04.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `Allgold`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `inventory`
--

CREATE TABLE `inventory` (
  `inventoryID` int(10) NOT NULL,
  `productID` int(10) NOT NULL,
  `stationID` int(10) NOT NULL,
  `currentAmount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `inventory`
--

INSERT INTO `inventory` (`inventoryID`, `productID`, `stationID`, `currentAmount`) VALUES
(1, 1, 1, 10),
(22, 7, 1, 3),
(23, 5, 5, 5),
(24, 5, 3, 8);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `products`
--

CREATE TABLE `products` (
  `productID` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `price` decimal(3,2) NOT NULL,
  `durability` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `products`
--

INSERT INTO `products` (`productID`, `name`, `price`, `durability`) VALUES
(1, 'Milch', '1.00', 14),
(2, 'Emmentaler', '3.95', 60),
(3, 'Gauda', '3.10', 60),
(4, 'Joghurt 100g', '0.50', 7),
(5, 'Quark', '0.90', 10),
(6, 'Joghurt 500g', '2.00', 7),
(7, 'Streichkaese', '1.50', 21),
(8, 'Bergkaese', '5.00', 60);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `refill`
--

CREATE TABLE `refill` (
  `refillID` int(11) NOT NULL,
  `stationID` int(10) NOT NULL,
  `productID` int(10) NOT NULL,
  `amount` int(3) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supplier` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `sale`
--

CREATE TABLE `sale` (
  `saleID` int(11) NOT NULL,
  `productID` int(10) NOT NULL,
  `stationID` int(10) NOT NULL,
  `amount` int(3) NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `seller`
--

CREATE TABLE `seller` (
  `sellerID` int(11) NOT NULL,
  `type` int(1) NOT NULL,
  `human_machine_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `station`
--

CREATE TABLE `station` (
  `stationID` int(10) NOT NULL,
  `coordsA` varchar(30) NOT NULL,
  `coordsL` varchar(30) NOT NULL,
  `location` varchar(30) NOT NULL,
  `type` varchar(1) NOT NULL,
  `description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `station`
--

INSERT INTO `station` (`stationID`, `coordsA`, `coordsL`, `location`, `type`, `description`) VALUES
(1, '47.71457225467146', '10.314338207244873', 'Kempten', 'B', 'Firmensitz'),
(2, '47.72426740349347', '10.316848754882812', 'Kempten', 'A', 'Aussenstelle'),
(3, '47.882828716292344', '10.6264343852617', 'Kaufbeuren', 'V', 'Aussenstelle'),
(4, '47.98036221803081', '10.1788330078125', 'Memmingen', 'B', 'Aussenstelle'),
(5, '47.694697038966076', '10.038070678710938', 'Isny', 'A', 'Aussenstelle'),
(6, '47.77941861197757', '10.616891384124756', 'Marktoberdorf', 'A', 'Aussenstelle'),
(7, '47.514634612973694', '10.26755619153846', 'Sonthofen', 'V', 'Aussenstelle'),
(8, '47.41029678060909', '10.275293827580754', 'Oberstdorf', 'A', 'Aussenstelle'),
(9, '47.554643912647045', '10.022393703984562', 'Oberstaufen', 'A', 'Aussenstelle'),
(10, '47.560841627466885', '10.21770143561298', 'Immenstadt', 'A', 'Aussenstelle'),
(11, '47.569648', '10.700432800000044', 'Fuessen', 'B', 'Aussenstelle'),
(12, '47.550241351721596', '9.69220304476039', 'Lindau', 'B', 'Aussenstelle');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventoryID`),
  ADD KEY `FK_stationID` (`stationID`),
  ADD KEY `FK_productID` (`productID`);

--
-- Indizes für die Tabelle `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productID`);

--
-- Indizes für die Tabelle `refill`
--
ALTER TABLE `refill`
  ADD PRIMARY KEY (`refillID`,`stationID`,`productID`),
  ADD KEY `fk_station` (`stationID`),
  ADD KEY `fk_products` (`productID`);

--
-- Indizes für die Tabelle `sale`
--
ALTER TABLE `sale`
  ADD PRIMARY KEY (`saleID`,`productID`,`stationID`);

--
-- Indizes für die Tabelle `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`sellerID`);

--
-- Indizes für die Tabelle `station`
--
ALTER TABLE `station`
  ADD PRIMARY KEY (`stationID`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventoryID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT für Tabelle `products`
--
ALTER TABLE `products`
  MODIFY `productID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT für Tabelle `refill`
--
ALTER TABLE `refill`
  MODIFY `refillID` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `station`
--
ALTER TABLE `station`
  MODIFY `stationID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `FK_productID` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `FK_stationID` FOREIGN KEY (`stationID`) REFERENCES `station` (`stationID`);

--
-- Constraints der Tabelle `refill`
--
ALTER TABLE `refill`
  ADD CONSTRAINT `fk_products` FOREIGN KEY (`productID`) REFERENCES `products` (`productID`),
  ADD CONSTRAINT `fk_station` FOREIGN KEY (`stationID`) REFERENCES `station` (`stationID`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
