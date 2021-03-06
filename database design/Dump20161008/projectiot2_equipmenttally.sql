CREATE DATABASE  IF NOT EXISTS `projectiot2` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `projectiot2`;
-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: localhost    Database: projectiot2
-- ------------------------------------------------------
-- Server version	5.7.13-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `equipmenttally`
--

DROP TABLE IF EXISTS `equipmenttally`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipmenttally` (
  `EquipmentTallyId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `State` int(10) unsigned NOT NULL,
  `EquipmentId` int(10) unsigned NOT NULL,
  `UserId` int(10) unsigned NOT NULL,
  `TimeStamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`EquipmentTallyId`),
  KEY `fk_equipmenttally_user` (`UserId`),
  KEY `fk_equipmenttally_equipment` (`EquipmentId`),
  CONSTRAINT `fk_equipmenttally_equipment` FOREIGN KEY (`EquipmentId`) REFERENCES `equipment` (`EquipmentId`),
  CONSTRAINT `fk_equipmenttally_user` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipmenttally`
--

LOCK TABLES `equipmenttally` WRITE;
/*!40000 ALTER TABLE `equipmenttally` DISABLE KEYS */;
INSERT INTO `equipmenttally` VALUES (1,0,1,1,'2016-10-08 13:02:25'),(2,1,1,1,'2016-10-08 13:02:32'),(3,0,1,1,'2016-10-08 13:02:39');
/*!40000 ALTER TABLE `equipmenttally` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-08 19:03:18
