CREATE TABLE `sale` (
  `saleID` int(11) NOT NULL,
  `sellerID` int(10) NOT NULL,
  `productID` int(10) NOT NULL,
  `stationID` int(10) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `gesamtpreis` int(10) NOT NULL,
  CONSTRAINT pk_sale PRIMARY KEY (saleID, sellerID, productID, stationID),
  CONSTRAINT fk_seller FOREIGN KEY (sellerID) REFERENCES seller(sellerID),
  CONSTRAINT fk_product FOREIGN KEY (productID) REFERENCES products(productID),
  CONSTRAINT fk_station FOREIGN KEY (stationID) REFERENCES statoion(stationID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `saleproduct`(
  `saleproductID` int(11) NOT NULL,
  `productID` int(10) NOT NULL,
  `saleID` int(10) NOT NULL,
  `amount` int(10) NOT NULL,
  CONSTRAINT pk_sale PRIMARY KEY (saleproductID, productID, saleID)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;