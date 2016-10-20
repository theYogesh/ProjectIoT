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
-- Table structure for table `emergencyemail`
--

DROP TABLE IF EXISTS `emergencyemail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `emergencyemail` (
  `EmailId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `Email` varchar(150) NOT NULL,
  `UserId` int(10) unsigned NOT NULL,
  PRIMARY KEY (`EmailId`),
  UNIQUE KEY `emergencymail_unique_key` (`Email`,`UserId`),
  KEY `fk_mail` (`UserId`),
  CONSTRAINT `fk_mail` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='emergency email list for Users';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emergencyemail`
--

LOCK TABLES `emergencyemail` WRITE;
/*!40000 ALTER TABLE `emergencyemail` DISABLE KEYS */;
INSERT INTO `emergencyemail` VALUES (2,'info.yogibaba@gmail.com',1),(3,'rrohitcchaudhary@gmail.com',2),(1,'yogi.nagarro@gmail.com',1);
/*!40000 ALTER TABLE `emergencyemail` ENABLE KEYS */;
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
