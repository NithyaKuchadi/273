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
-- Table structure for table `Orders`
--

DROP TABLE IF EXISTS `Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Orders` (
  `OrderID` int(11) NOT NULL AUTO_INCREMENT,
  `RestaurantID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `StatusOfOrder` varchar(45) NOT NULL,
  `usersofid` int(11) NOT NULL,
  `itemsofid` int(11) NOT NULL,
  `creation_ts` datetime DEFAULT CURRENT_TIMESTAMP,
  `modified_ts` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OrderID`,`RestaurantID`),
  KEY `RestaurantID_idx` (`RestaurantID`),
  KEY `userid_idx` (`usersofid`),
  KEY `itemsofid_idx` (`itemsofid`),
  CONSTRAINT `RestaurantID` FOREIGN KEY (`RestaurantID`) REFERENCES `restaurants` (`RestaurantID`),
  CONSTRAINT `itemsofid` FOREIGN KEY (`itemsofid`) REFERENCES `items` (`ItemID`),
  CONSTRAINT `usersofid` FOREIGN KEY (`usersofid`) REFERENCES `users` (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Orders`
--

LOCK TABLES `Orders` WRITE;
/*!40000 ALTER TABLE `Orders` DISABLE KEYS */;
INSERT INTO `Orders` VALUES (4,11,1,16,'Delivered',53,32,'2019-10-04 21:22:26','2019-10-04 22:58:56'),(5,12,2,46,'Ready',53,34,'2019-10-04 21:24:06','2019-10-04 23:11:35'),(6,18,2,40,'Delivered',53,35,'2019-10-04 21:23:25','2019-10-04 22:58:56'),(7,11,3,30,'New',53,28,'2019-10-06 16:46:05','2019-10-06 16:46:05'),(8,11,2,10,'New',53,26,'2019-10-06 16:46:05','2019-10-06 16:46:05'),(9,11,2,16,'New',53,27,'2019-10-06 16:46:05','2019-10-06 16:46:05'),(10,11,2,30,'New',53,29,'2019-10-06 16:46:05','2019-10-06 16:46:05'),(11,11,1,7,'New',53,30,'2019-10-06 16:46:05','2019-10-06 16:46:05'),(12,11,2,16,'New',53,31,'2019-10-06 16:46:05','2019-10-06 16:46:05'),(13,11,1,5,'New',53,26,'2019-10-06 16:48:08','2019-10-06 16:48:08'),(14,11,1,5,'New',53,26,'2019-10-06 16:50:11','2019-10-06 16:50:11'),(15,11,1,5,'New',53,26,'2019-10-06 16:52:20','2019-10-06 16:52:20');
/*!40000 ALTER TABLE `Orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-06 22:46:51
