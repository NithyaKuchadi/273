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
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL AUTO_INCREMENT,
  `UserName` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `PhoneNumber` varchar(45) DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `UserType` varchar(45) NOT NULL,
  `RestName` varchar(45) DEFAULT NULL,
  `ProfileImage` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (51,'Nithya Kuchadi','nithya@gmail.com','16b25fa6a35cce602eb3606906ff97064191e746','6504475935',NULL,'Owner','Nithya\'sTable','second123.JPG'),(52,'Abhishek','abhishek@gmail.com','0731fdeb307910eeaae4e58897b7baaba45e054b','567899000',NULL,'Owner','Paradise','abhi.JPG'),(53,'Srinish Kuchadi','srinish@gmail.com','0e38ff1a6953add7c6eb94414d5417d0cd31a492','4908468905','1292 Avenue 78909','Buyer',NULL,'DSCN0211.JPG'),(59,'Ramesh','ramesh@gmail.com','53edd6990376d7b5f512d2b5556613ca2567f04c','2345676',NULL,'Owner','Bawarchi','dad.jpg'),(60,'Pallavi','pallavi@gmail.com','9052a5981f24498db17c1b2b95980e0bffd8ec76',NULL,NULL,'Buyer',NULL,NULL),(61,'nithya@gmail.com','','0731fdeb307910eeaae4e58897b7baaba45e054b',NULL,NULL,'Owner','',NULL),(62,'Manjula','manjula@gmail.com','8eef6396614ebd882aa8bd0833102ec30fb0293e',NULL,NULL,'Owner','PistaHouse',NULL),(63,'akhil','akhil@gmail.com','e868a7f71518c30388f725182ee85510c18f306e',NULL,NULL,'Buyer',NULL,NULL);
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
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
