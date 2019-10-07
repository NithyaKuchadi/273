-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: 273Project
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Items`
--

DROP TABLE IF EXISTS `Items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Items` (
  `NameOfItem` varchar(45) NOT NULL,
  `DescriptionOfItem` varchar(45) DEFAULT NULL,
  `PriceOfItem` varchar(45) NOT NULL,
  `idofrest` int(11) NOT NULL,
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `sectID` int(11) NOT NULL DEFAULT '1000',
  `ItemImage` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ItemID`),
  KEY `idofrest_idx` (`idofrest`),
  CONSTRAINT `idofrest` FOREIGN KEY (`idofrest`) REFERENCES `restaurants` (`RestaurantID`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Items`
--

LOCK TABLES `Items` WRITE;
/*!40000 ALTER TABLE `Items` DISABLE KEYS */;
INSERT INTO `Items` VALUES ('PuffCakes','Sweet Cakes. Will be served after lunch','5',11,26,20,'C:\\fakepath\\starter.jpg'),('Idli','Served with cocunut chutney and sambar','8',11,27,21,'C:\\fakepath\\idli.jpeg'),('Dosa','Aloo Dosa','10',11,28,21,'C:\\fakepath\\dosa.jpg'),('Biryani','Spicy Biryani with Raita','15',11,29,22,'C:\\fakepath\\biryani.jpg'),('Pulav','Tomato Rice with beans','7',11,30,22,'C:\\fakepath\\pulav.jpg'),('Manchuria','Chicken Manchuria Dry with sauce','8',11,31,23,'C:\\fakepath\\manchuria.jpg'),('lollipop','Chicken dry lollipop','16',11,32,23,'C:\\fakepath\\lollipop.jpeg'),('Biryani','Gongura Biryani','15',12,33,24,'C:\\fakepath\\biryani.jpg'),('Chicken Manchuria','Spicy manchuria with sauce','23',12,34,25,'C:\\fakepath\\manchuria.jpg'),('Biryani','very spicy ','20',18,35,27,'C:\\fakepath\\biryani.jpg');
/*!40000 ALTER TABLE `Items` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-06 22:46:50
