-- phpMyAdmin SQL Dump
-- version 4.2.3
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Erstellungszeit: 11. Jan 2017 um 11:23
-- Server Version: 5.6.33
-- PHP-Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Datenbank: `studienplanungstool`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course`
--
-- Erstellt am: 23. Dez 2016 um 13:31
--

DROP TABLE IF EXISTS `course`;
CREATE TABLE IF NOT EXISTS `course` (
`uid` int(11) NOT NULL,
  `code` varchar(30) NOT NULL COMMENT 'Modulcode',
  `shortname` varchar(45) DEFAULT NULL,
  `name_de` varchar(255) DEFAULT NULL COMMENT 'Titel de',
  `name_fr` varchar(255) DEFAULT NULL COMMENT 'Titel fr',
  `type` int(11) DEFAULT NULL COMMENT 'Modultyp - wahl pflicht etc',
  `coursegroup` int(11) DEFAULT NULL COMMENT 'Modulgruppe a,b,c,d',
  `ects` tinyint(4) DEFAULT NULL COMMENT 'Anzahl ECTS',
  `examType` int(11) DEFAULT NULL COMMENT 'Art des Kompetenznachweises',
  `dummy` bit(1) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=200 ;

--
-- RELATIONEN DER TABELLE `course`:
--   `coursegroup`
--       `coursegroup` -> `uid`
--   `type`
--       `coursetype` -> `uid`
--   `examType`
--       `examtype` -> `uid`
--

--
-- Daten für Tabelle `course`
--

INSERT INTO `course` (`uid`, `code`, `shortname`, `name_de`, `name_fr`, `type`, `coursegroup`, `ects`, `examType`, `dummy`) VALUES
(1, 'BTI7021', 'BAdm1', 'Betriebswirtschaftslehre 1', 'Economie d''entreprise 1', 1, 2, 4, 1, NULL),
(2, 'BTI7022', 'BAdm2', 'Betriebswirtschaftslehre 2', 'Economie d''entreprise 2', 1, 2, 4, 1, NULL),
(3, 'BTI7023', 'Law', 'Recht und Informationsgesellschaft', 'Droit et société de l''information', 1, 2, 2, 1, NULL),
(4, 'BTI7051', 'OOP1', 'Objektorientierte Programmierung 1', 'Programmation orientée objet 1', 1, 1, 6, 2, NULL),
(5, 'BTI7054', 'Web', 'Web Programming', 'Web Programming', 1, 1, 4, 3, NULL),
(6, 'BTI7056', 'DB', 'Datenbanken', 'Bases de données', 1, 1, 4, 2, NULL),
(7, 'BTI7061', 'CSBas', 'Grundlagen der Informatik', 'Bases de l''informatique', 1, 1, 6, 2, NULL),
(8, 'BTI7062', 'AlDa', 'Algorithmen und Datenstrukturen', 'Algorithmes et structures de données', 1, 1, 6, 2, NULL),
(9, 'BTI7064', 'AutLg', 'Automaten und formale Sprachen', 'Automates et langages formels', 1, 1, 2, 2, NULL),
(10, 'BTI7065', 'CalCp', 'Berechenbarkeit und Komplexität', 'Calculabilité et complexité', 1, 1, 2, 1, NULL),
(11, 'BTI7071', 'Tele', 'Telematik', 'Téléinformatique', 1, 1, 4, 2, NULL),
(12, 'BTI7081', 'SoED', 'Software Engineering and Design', 'Software Engineering and Design', 1, 1, 8, 2, NULL),
(13, 'BTI7082', 'ProMg', 'Project Management', 'Project Management', 1, 1, 2, 3, NULL),
(14, 'BTI7083', 'UCD', 'User-Centered Design', 'User-Centered Design', 2, 1, 4, 3, NULL),
(15, 'BTI7252', 'MC2', 'Development of Mobile Applications', 'Development of Mobile Applications', 1, 3, 8, 1, NULL),
(16, 'BTI7262', 'ITS2', 'Secure IT Infrastructures', 'Secure IT Infrastructures', 1, 3, 8, 1, NULL),
(17, 'BTI7272', 'WBA2', 'E-Business and Web', 'Multi Tier Business Applications', 1, 3, 8, 1, NULL),
(18, 'BTI7282', 'CPVR2', 'Virtual Reality and Artificial Intelligence', 'Virtual Reality and Artificial Intelligence', 1, 3, 8, 1, NULL),
(19, 'BTI7301', 'Proj1', 'Projekt 1', 'Projet 1', 1, 3, 8, 3, NULL),
(20, 'BTI7311', 'CSSem', 'Informatik Seminar', 'Séminaire d''informatique', 1, 3, 4, 3, NULL),
(21, 'BTI7407', 'PComp', 'Paralleles Rechnen', 'Paralleles Rechnen', 3, 5, 4, 3, NULL),
(22, 'BTI7408', 'AWebT', 'Advanced Web Technologies', 'Advanced Web Technologies', 3, 5, 4, 3, NULL),
(23, 'BTI7509', 'SAP', 'SAP-Prozesse', 'Processus SAP', 3, 5, 2, 3, NULL),
(24, 'BTI7512', 'EinfC#', 'Einführung in C#', 'Introduction à C#', 3, 5, 2, 3, NULL),
(25, 'BTI7513', 'HERM', 'Projektführungsmodell HERMES', 'Me?thode de gestion de projet HERMES', 3, 5, 2, 3, NULL),
(26, 'BTI7515', 'JSDO1', 'Java Soft. Entwicklung mit Open Source 1', 'Java Soft. Entwicklung mit Open Source 1', 3, 5, 2, 3, NULL),
(27, 'BTI7517', 'Bio', 'Biometrie', 'Biométrie', 3, 5, 2, 3, NULL),
(28, 'BTI7520', 'DigPh', 'Digitale Photographie', 'Digitale Photographie', 3, 5, 2, 3, NULL),
(29, 'BTI7526', 'Cloud', 'Cloud Computing', 'Cloud Computing', 3, 5, 2, 3, NULL),
(30, 'BTI7529', 'CrypT', 'Advanced Cryptography for Security and Privacy', 'Advanced Cryptography for Security and Privacy', 3, 5, 2, 3, NULL),
(31, 'BTI7530', 'SAP-D', 'SAP Development', 'SAP Development', 3, 5, 2, 3, NULL),
(32, 'BTI7534', 'Adv GamDev', 'Advanced Game Development', 'Advanced Game Development', 3, 5, 2, 3, NULL),
(33, 'BTI7535', 'DatSci', 'Data Science', 'Data Science', 3, 5, 2, 3, NULL),
(34, 'BTI7536', 'IntInfSc', 'Einführung in die Informationssicherheit', 'Introduction à la sécurité informatique', 3, 5, 2, 3, NULL),
(35, 'BTM3830', 'MOBROB', 'Mobile Roboter', 'Mobile Roboter', 3, 5, 2, 3, NULL),
(36, 'BZG1151', 'DISMAT', 'Diskrete Mathematik', 'Mathématiques discrètes', 1, 1, 6, 3, NULL),
(37, 'BZG1153', 'ANALY', 'Analysis', 'Analyse', 1, 1, 4, 2, NULL),
(38, 'BZG1301', 'PRGMO', 'Programmierung in Matlab/Octave', 'Programmierung in Matlab/Octave', 3, 6, 2, 3, NULL),
(39, 'BZG1310', 'GEOAL', 'Objektorientierte Geometrie', 'Objektorientierte Geometrie', 3, 6, 2, 3, NULL),
(40, 'BZG2251', 'NWTEC1', 'Naturwissenschaft und Technik 1', 'Sciences naturelles et Technologie 1', 1, 2, 4, 3, NULL),
(41, 'BZG2252', 'NWTEC2', 'Naturwissenschaft und Technik 2', 'Sciences naturelles et Technologie 2', 1, 2, 4, 3, NULL),
(42, 'BZG2310', 'MODWERK', 'Moderne Werkstoffe', 'Matériaux modernes', 2, 4, NULL, NULL, NULL),
(43, 'BZG2312', 'ASTRO', 'Astronomie', 'Astronomie', 3, 6, 2, 3, NULL),
(44, 'BZG3101', 'KOMM1D', 'Kommunikation 1 Deutsch', 'Kommunikation 1 Deutsch', 1, 2, 2, 3, NULL),
(45, 'BZG3102', 'KOMM2D', 'Kommunikation 2 Deutsch', 'Kommunikation 2 Deutsch', 1, 2, 2, 3, NULL),
(46, 'BZG3103', 'DEUT1', 'Deutsch 1', 'Deutsch 1', 2, 2, 2, 3, NULL),
(47, 'BZG3105', 'DEU1BA', 'Deutsch 1 Basiskurs', 'Deutsch 1 Basiskurs', 2, 2, 2, 3, NULL),
(48, 'BZG3107', 'KOMFS1', 'Kommunikation für Fremdsprachige 1', 'Kommunikation für Fremdsprachige 1', 1, 2, 2, 3, NULL),
(49, 'BZG3201', 'COMM1F', 'Communication 1 Français', 'Communication 1 Français', 1, 2, 2, 3, NULL),
(50, 'BZG3203', 'FRAN1', 'Français 1', 'Français 1', 2, 2, 2, 3, NULL),
(51, 'BZG3205', 'FRA1BA', 'Français 1 cours de base', 'Français 1 cours de base', 2, 2, 2, 3, NULL),
(52, 'BZG3207', 'FRA1AV', 'Français 1 cours avancé', 'Français 1 cours avancé', 2, 2, 2, 3, NULL),
(53, 'BZG3301', 'COMM1I', 'Comunicazione 1 Italiano', 'Comunicazione 1 Italiano', 1, 2, 2, 3, NULL),
(54, 'BZG3401', 'ENG1IN', 'English 1 upper intermediate', 'English 1 upper intermediate', 1, 2, 2, 3, NULL),
(55, 'BZG3411', 'ENG1AD', 'English 1 advanced', 'English 1 advanced', 1, 2, 2, 3, NULL),
(56, 'BZG3421', 'ENGFC', 'First Certificate Exam in English', 'First Certificate Exam in English', 3, 6, 2, 3, NULL),
(57, 'BZG3501', 'SPAN1', 'Spanisch 1', 'Espagnol 1', 3, 6, 2, 3, NULL),
(58, 'BZG4201', 'FINUNT', 'Rechnungswesen', 'Comptabilité', 2, 4, NULL, NULL, NULL),
(59, 'BZG4202', 'INVFIN', 'Investitionstheorie und Finanzmanagement', 'Investissements et finances', 2, 4, NULL, NULL, NULL),
(60, 'BZG4204', 'HUMRES', 'Human Resources: Teamwork and Leadership', 'Human Resources: Teamwork and Leadership', 3, 6, 2, 3, NULL),
(61, 'BZG4205', 'STRAMA', 'Strategiemanagement', 'Management de la stratégie', 3, 6, 2, 3, NULL),
(62, 'BZG4206', 'INNOMA', 'Technologie- und Innovationsmanagement', 'Technologie et innovation', 3, 6, 2, 3, NULL),
(65, 'BZG1152', NULL, 'Lineare Algebra', 'Algèbre linéaire', 1, 1, 6, 2, NULL),
(67, 'BZG1154', NULL, 'Wahrscheinlichkeitsrechnung und Statistik', 'Probabilités et statistiques', 1, 1, 4, 2, NULL),
(70, 'BTI7055', NULL, 'Objektorientierte Programmierung 2', 'Programmation orientée objet 2', 1, 1, 6, 2, NULL),
(74, 'BTI7063', NULL, 'Betriebssysteme', 'Systèmes d''exploitation', 1, 1, 4, 2, NULL),
(78, 'BTI7072', NULL, 'Network Design and Services', 'Network Design and Services', 1, 1, 4, 2, NULL),
(85, 'BZG3108', NULL, 'Kommunikation für Fremdsprachige 2', 'Kommunikation für Fremdsprachige 2', 1, 2, 2, 3, NULL),
(89, 'BZG3204', NULL, 'Français 2', 'Français 2', 2, 2, 2, 3, NULL),
(90, 'BZG3206', NULL, 'Français 2 cours de base', 'Français 2 cours de base', 2, 2, 2, 3, NULL),
(91, 'BZG3208', NULL, 'Français 2 cours avancé', 'Français 2 cours avancé', 2, 2, 2, 3, NULL),
(93, 'BZG3202', NULL, 'Communication 2 Français', 'Communication 2 Français', 1, 2, 2, 3, NULL),
(96, 'BZG3104', NULL, 'Deutsch 2', 'Deutsch 2', 2, 2, 2, 3, NULL),
(97, 'BZG3106', NULL, 'Deutsch 2 Basiskurs', 'Deutsch 2 Basiskurs', 2, 2, 2, 3, NULL),
(99, 'BZG3302', NULL, 'Comunicazione 2 Italiano', 'Comunicazione 2 Italiano', 1, 2, 2, 3, NULL),
(112, 'BZG3402', NULL, 'English 2 upper intermediate', 'English 2 upper intermediate', 1, 2, 2, 3, NULL),
(113, 'BZG3412', NULL, 'English 2 advanced', 'English 2 advanced', 1, 2, 2, 3, NULL),
(114, 'BZG3403', NULL, 'English 3 upper intermediate', 'English 3 upper intermediate', 1, 2, 2, 3, NULL),
(115, 'BZG3413', NULL, 'English 3 advanced', 'English 3 advanced', 1, 2, 2, 3, NULL),
(122, 'BTI7251', NULL, 'Mobile Systems and Terminals', 'Mobile Systems and Terminals', 1, 3, 8, 1, NULL),
(124, 'BTI7253', NULL, 'Management of Mobile Applications and Systems', 'Management of Mobile Applications and Systems', 1, 3, 8, 1, NULL),
(125, 'BTI7261', NULL, 'Applied Cryptography', 'Applied Cryptography', 1, 3, 8, 1, NULL),
(127, 'BTI7263', NULL, 'Application- and Software-Security', 'Application- and Software-Security', 1, 3, 8, 1, NULL),
(128, 'BTI7271', NULL, 'Multi Tier Business Applications', 'Multi Tier Business Applications', 1, 3, 8, 1, NULL),
(130, 'BTI7273', NULL, 'ICT-based General Management', 'ICT-based General Management', 1, 3, 8, 1, NULL),
(131, 'BTI7281', NULL, 'Computer Perception and Computer Graphics', 'Computer Perception and Computer Graphics', 1, 3, 8, 1, NULL),
(133, 'BTI7283', NULL, 'Games and Simulation', 'Games and Simulation', 1, 3, 8, 1, NULL),
(135, 'BTI7302', NULL, 'Projekt 2', 'Projet 2', 1, 3, 4, 3, NULL),
(137, 'BTI7321', NULL, 'Bachelor Thesis', 'Thèse de bachelor', 1, 3, 12, 3, NULL),
(142, 'BTI7501', NULL, 'Spieltheorie', 'Spieltheorie', 3, 5, 2, 3, NULL),
(143, 'BTI7503', NULL, 'Advanced C++', 'Advanced C++', 3, 5, 2, 3, NULL),
(144, 'BTI7504', NULL, 'Semantic Web', 'Semantic Web', 3, 5, 2, 3, NULL),
(146, 'BTI7510', NULL, 'Artificial Intelligence', 'Artificial Intelligence', 3, 5, 2, 3, NULL),
(150, 'BTI7516', NULL, 'Java Soft. Entwicklung mit Open Source 2', 'Java Soft. Entwicklung mit Open Source 2', 3, 5, 2, 3, NULL),
(154, 'BTI7527', NULL, 'Game Development', 'Game Development', 3, 5, 2, 3, NULL),
(155, 'BTI7528', NULL, 'Advanced Data Management', 'Advanced Data Management', 3, 5, 2, 3, NULL),
(158, 'BTI7531', NULL, 'App-Programmierung mit C# und .NET', 'Programmation des app avec C#', 3, 5, 2, 3, NULL),
(159, 'BTI7532', NULL, 'iOS-Programmierung', 'Programmation iOS', 3, 5, 2, 3, NULL),
(160, 'BTI7533', NULL, 'Praxis Startup', 'Fondation d''une start-up', 3, 5, 2, 3, NULL),
(164, 'BTI7537', NULL, 'Cryptocurrencies and Smart Contracts', 'Cryptocurrencies and Smart Contracts', 3, 5, 2, 3, NULL),
(165, 'BTI7538', NULL, 'Geoinformationssysteme', 'Geoinformationssysteme', 3, 5, 2, 3, NULL),
(167, 'BTX8503', NULL, 'Wissensbasierte Systeme', 'Wissensbasierte Systeme', 3, 5, 2, 3, NULL),
(168, 'BTX8504', NULL, 'Applikationsbetreuung im Living Lab', 'Applikationsbetreuung im Living Lab', 3, 5, 2, 3, NULL),
(170, 'BZG5001', NULL, 'Auslandpraktikum', 'Stage à l''étranger', 3, 6, 2, 3, NULL),
(171, 'BZG5002', NULL, 'Summerschool in Magglingen', 'Summerschool in Magglingen', 3, 6, 2, 3, NULL),
(172, 'BZG5003', NULL, 'Interkulturalität und Transkulturalität in der Arbeitswelt, HAFL Zollikofen', 'Interkulturalität und Transkulturalität in der Arbeitswelt, HAFL Zollikofen', 3, 6, 2, 3, NULL),
(174, 'BZG3422', NULL, 'Cambridge Advanced Certificate in English', 'Cambridge Advanced Certificate in English', 3, 6, 2, 3, NULL),
(176, 'BZG3502', NULL, 'Spanisch 2', 'Espagnol 2', 3, 6, 2, 3, NULL),
(177, 'BZG3703', NULL, 'Zweisprachige Zusammenarbeit', 'Travail collaboratif bilingue', 3, 6, 2, 3, NULL),
(178, 'BZG4203', NULL, 'Marketing', 'Marketing', 3, 6, 2, 3, NULL),
(183, 'BZG1305', NULL, 'Public-Key Cryptography', 'Cryptographie à clé publique', 3, 6, 2, 3, NULL),
(185, 'BZG1312', NULL, 'Die Mathematik der GPS Ortung', 'Les mathématiques de la géolocalisation par GPS', 3, 6, 2, 3, NULL),
(186, 'BZG2302', NULL, 'Optische Bilderfassung', 'Acquisition d''images', 3, 6, 2, 3, NULL),
(187, 'BZG2306', NULL, 'Quantencomputing', 'Quantencomputing', 3, 6, 2, 3, NULL),
(188, 'BZG2309', NULL, 'Nachhaltigkeit in den Ingenieurwissenschaften', 'Développement durable dans les sciences de l''ingénieur', 3, 6, 2, 3, NULL),
(190, 'BTE5465', NULL, 'Racing Formula Student', 'Racing Formula Student', 3, 6, 2, 3, NULL),
(191, 'wm06', 'WM (6)', 'Wahlpflichtmodule (6)', 'Wahlpflichtmodule (6) [fr]', 3, 4, 6, NULL, b'1'),
(192, 'wm04', 'WM (4)', 'Wahlpflichtmodule (4)', 'Wahlpflichtmodule (4) [fr]', 3, 4, 4, NULL, b'1'),
(193, 'wm08', 'WM (8)', 'Wahlpflichtmodule (8)', 'Wahlpflichtmodule (8) [fr]', 3, 4, 8, NULL, b'1'),
(194, 'BZG34x1', 'ENG1', 'English 1', 'English 1', 1, 2, 2, 3, b'1'),
(195, 'BZG34x2', 'ENG2', 'English 2', 'English 2', 1, 2, 2, 3, b'1'),
(196, 'BZG34x3', 'ENG3', 'English 3', 'English 3', 1, 2, 2, 3, b'1'),
(197, 'BTI72x1', NULL, 'Vertiefungsmodul 1', NULL, 1, 3, 8, 1, b'1'),
(198, 'BTI72x2', NULL, 'Vertiefungsmodul 2', NULL, 1, 3, 8, 1, b'1'),
(199, 'BTI72x3', NULL, 'Vertiefungsmodul 3', NULL, 1, 3, 8, 1, b'1');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `courseexecution`
--
-- Erstellt am: 23. Dez 2016 um 13:51
--

DROP TABLE IF EXISTS `courseexecution`;
CREATE TABLE IF NOT EXISTS `courseexecution` (
`uid` int(11) NOT NULL,
  `executioncode` varchar(45) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `studypath_id` char(1) NOT NULL,
  `place` varchar(45) DEFAULT NULL,
  `classname` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `semester` int(11) NOT NULL,
  `professor` varchar(45) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Durchführungen' AUTO_INCREMENT=141 ;

--
-- RELATIONEN DER TABELLE `courseexecution`:
--   `course_id`
--       `course` -> `uid`
--   `studypath_id`
--       `studypath` -> `uid`
--

--
-- Daten für Tabelle `courseexecution`
--

INSERT INTO `courseexecution` (`uid`, `executioncode`, `course_id`, `studypath_id`, `place`, `classname`, `department`, `semester`, `professor`) VALUES
(1, 'BTI7021b', 1, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(2, 'BTI7021a', 1, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(3, 'BTI7022q', 2, 'I', 'BER', 'I2q', 'TI', 201602, NULL),
(4, 'BTI7022p', 2, 'I', 'BER', 'I2p', 'TI', 201602, NULL),
(5, 'BTI7023b', 3, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(6, 'BTI7023a', 3, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(7, 'BTI7051q', 4, 'I', 'BER', 'I1q', 'TI', 201602, NULL),
(8, 'BTI7051p', 4, 'I', 'BER', 'I1p', 'TI', 201602, NULL),
(9, 'BTI7051b', 4, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(10, 'BTI7051a', 4, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(11, 'BTI7054q', 5, 'I', 'BER', 'I3q', 'TI', 201602, NULL),
(12, 'BTI7054p', 5, 'I', 'BER', 'I3p', 'TI', 201602, NULL),
(13, 'BTI7054b', 5, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(14, 'BTI7054a', 5, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(15, 'BTI7056b', 6, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(16, 'BTI7056a', 6, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(17, 'BTI7061q', 7, 'I', 'BER', 'I1q', 'TI', 201602, NULL),
(18, 'BTI7061p', 7, 'I', 'BER', 'I1p', 'TI', 201602, NULL),
(19, 'BTI7061b', 7, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(20, 'BTI7061a', 7, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(21, 'BTI7062q', 8, 'I', 'BER', 'I2q', 'TI', 201602, NULL),
(22, 'BTI7062p', 8, 'I', 'BER', 'I2p', 'TI', 201602, NULL),
(23, 'BTI7064q', 9, 'I', 'BER', 'I3q', 'TI', 201602, NULL),
(24, 'BTI7064p', 9, 'I', 'BER', 'I3p', 'TI', 201602, NULL),
(25, 'BTI7065q', 10, 'I', 'BER', 'I4q', 'TI', 201602, NULL),
(26, 'BTI7065p', 10, 'I', 'BER', 'I4p', 'TI', 201602, NULL),
(27, 'BTI7065a', 10, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(28, 'BTI7071q', 11, 'I', 'BER', 'I3q', 'TI', 201602, NULL),
(29, 'BTI7071p', 11, 'I', 'BER', 'I3p', 'TI', 201602, NULL),
(30, 'BTI7071b', 11, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(31, 'BTI7071a', 11, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(32, 'BTI7081b', 12, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(33, 'BTI7081a', 12, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(34, 'BTI7082q', 13, 'I', 'BER', 'I3q', 'TI', 201602, NULL),
(35, 'BTI7082p', 13, 'I', 'BER', 'I3p', 'TI', 201602, NULL),
(36, 'BTI7083W', 14, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(37, 'BTI7083W', 14, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(38, 'BTI7083r', 14, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(39, 'BTI7083q', 14, 'I', 'BER', 'I4q', 'TI', 201602, NULL),
(40, 'BTI7083p', 14, 'I', 'BER', 'I4p', 'TI', 201602, NULL),
(41, 'BTI7083a', 14, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(42, 'BTI7252a', 15, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(43, 'BTI7262a', 16, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(44, 'BTI7272a', 17, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(45, 'BTI7282a', 18, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(46, 'BTI7301q', 19, 'I', 'BER', 'I3q', 'TI', 201602, NULL),
(47, 'BTI7301p', 19, 'I', 'BER', 'I3p', 'TI', 201602, NULL),
(48, 'BTI7311a', 20, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(49, 'BTI7407W', 21, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(50, 'BTI7408W', 22, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(51, 'BTI7408r', 22, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(52, 'BTI7408a', 22, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(53, 'BTI7509W', 23, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(54, 'BTI7512W', 24, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(55, 'BTI7512r', 24, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(56, 'BTI7512a', 24, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(57, 'BTI7513W', 25, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(58, 'BTI7513a', 25, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(59, 'BTI7515W', 26, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(60, 'BTI7517W', 27, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(61, 'BTI7517r', 27, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(62, 'BTI7517a', 27, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(63, 'BTI7520W', 28, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(64, 'BTI7526W', 29, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(65, 'BTI7529W', 30, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(66, 'BTI7529r', 30, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(67, 'BTI7529a', 30, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(68, 'BTI7530W', 31, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(69, 'BTI7534W', 32, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(70, 'BTI7534r', 32, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(71, 'BTI7534a', 32, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(72, 'BTI7535W', 33, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(73, 'BTI7535r', 33, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(74, 'BTI7535a', 33, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(75, 'BTI7536W', 34, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(76, 'BTM3830W', 35, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(77, 'BZG1151q', 36, 'I', 'BER', 'I1q', 'TI', 201602, NULL),
(78, 'BZG1151p', 36, 'I', 'BER', 'I1p', 'TI', 201602, NULL),
(79, 'BZG1151b', 36, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(80, 'BZG1151a', 36, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(81, 'BZG1153q', 37, 'I', 'BER', 'I2q', 'TI', 201602, NULL),
(82, 'BZG1153p', 37, 'I', 'BER', 'I2p', 'TI', 201602, NULL),
(83, 'BZG1153b', 37, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(84, 'BZG1153a', 37, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(85, 'BZG1301W', 38, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(86, 'BZG1310W', 39, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(87, 'BZG1310r', 39, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(88, 'BZG1310a', 39, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(89, 'BZG2251q', 40, 'I', 'BER', 'I2q', 'TI', 201602, NULL),
(90, 'BZG2251p', 40, 'I', 'BER', 'I2p', 'TI', 201602, NULL),
(91, 'BZG2251b', 40, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(92, 'BZG2251a', 40, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(93, 'BZG2252b', 41, 'I', 'BIE', 'I2b', 'TI', 201602, NULL),
(94, 'BZG2252a', 41, 'I', 'BIE', 'I2a', 'TI', 201602, NULL),
(95, 'BZG2310W', 42, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(96, 'BZG2310r', 42, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(97, 'BZG2310a', 42, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(98, 'BZG2312W', 43, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(99, 'BZG2312W', 43, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(100, 'BZG2312r', 43, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(101, 'BZG2312a', 43, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(102, 'BZG3101b', 44, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(103, 'BZG3101a', 44, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(104, 'BZG3102q', 45, 'I', 'BER', 'I2q', 'TI', 201602, NULL),
(105, 'BZG3102p', 45, 'I', 'BER', 'I2p', 'TI', 201602, NULL),
(106, 'BZG3103b', 46, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(107, 'BZG3105b', 47, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(108, 'BZG3107F', 48, 'I', 'BER', 'I_Foreigners', 'TI', 201602, NULL),
(109, 'BZG3201b', 49, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(110, 'BZG3203b', 50, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(111, 'BZG3203a', 50, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(112, 'BZG3205b', 51, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(113, 'BZG3205a', 51, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(114, 'BZG3207b', 52, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(115, 'BZG3207a', 52, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(116, 'BZG3301b', 53, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(117, 'BZG3401q', 54, 'I', 'BER', 'I1q', 'TI', 201602, NULL),
(118, 'BZG3401p', 54, 'I', 'BER', 'I1p', 'TI', 201602, NULL),
(119, 'BZG3401b', 54, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(120, 'BZG3401a', 54, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(121, 'BZG3411q', 55, 'I', 'BER', 'I1q', 'TI', 201602, NULL),
(122, 'BZG3411p', 55, 'I', 'BER', 'I1p', 'TI', 201602, NULL),
(123, 'BZG3411b', 55, 'I', 'BIE', 'I1b', 'TI', 201602, NULL),
(124, 'BZG3411a', 55, 'I', 'BIE', 'I1a', 'TI', 201602, NULL),
(125, 'BZG3421W', 56, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(126, 'BZG3501W', 57, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(127, 'BZG3501W', 57, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(128, 'BZG3501r', 57, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(129, 'BZG3501a', 57, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(130, 'BZG4201W', 58, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(131, 'BZG4202W', 59, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(132, 'BZG4204W', 60, 'I', 'BER', 'I_WPM-Be', 'TI', 201602, NULL),
(133, 'BZG4205W', 61, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(134, 'BZG4205r', 61, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(135, 'BZG4205a', 61, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(136, 'BZG4206W', 62, 'I', 'BIE', 'I_WPM-Bi', 'TI', 201602, NULL),
(137, 'BZG4206r', 62, 'I', 'BIE', 'I4r', 'TI', 201602, NULL),
(138, 'BZG4206a', 62, 'I', 'BIE', 'I3a', 'TI', 201602, NULL),
(140, 'BZG3422p', 174, 'I', 'BER', 'I_WPM-Be', 'TI', 201701, NULL);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `courseexecution_view`
--
DROP VIEW IF EXISTS `courseexecution_view`;
CREATE TABLE IF NOT EXISTS `courseexecution_view` (
`uid` int(11)
,`executioncode` varchar(45)
,`studypath_id` char(1)
,`place` varchar(45)
,`classname` varchar(45)
,`semester` int(11)
,`course_id` int(11)
,`coursecode` varchar(30)
,`course_name_de` varchar(255)
,`course_name_fr` varchar(255)
,`coursetype` char(2)
,`coursegroup` varchar(2)
,`examtype` varchar(45)
,`ects` tinyint(4)
);
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `coursegroup`
--
-- Erstellt am: 23. Dez 2016 um 13:30
--

DROP TABLE IF EXISTS `coursegroup`;
CREATE TABLE IF NOT EXISTS `coursegroup` (
`uid` int(11) NOT NULL,
  `shortName` varchar(2) NOT NULL COMMENT 'Name lang',
  `minECTS` smallint(6) NOT NULL COMMENT 'minimale ECTS',
  `maxECTS` smallint(6) NOT NULL COMMENT 'maximale ECTS',
  `normECTS` smallint(6) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Daten für Tabelle `coursegroup`
--

INSERT INTO `coursegroup` (`uid`, `shortName`, `minECTS`, `maxECTS`, `normECTS`) VALUES
(1, 'A', 74, 82, 78),
(2, 'B', 26, 32, 28),
(3, 'C', 44, 52, 52),
(4, 'D', 18, 30, 22),
(5, 'D1', 10, 30, 0),
(6, 'D2', 8, 30, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `coursetype`
--
-- Erstellt am: 23. Dez 2016 um 13:30
--

DROP TABLE IF EXISTS `coursetype`;
CREATE TABLE IF NOT EXISTS `coursetype` (
`uid` int(11) NOT NULL,
  `name` char(16) DEFAULT NULL,
  `shortName` char(2) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `coursetype`
--

INSERT INTO `coursetype` (`uid`, `name`, `shortName`) VALUES
(1, 'Pflichtmodul', 'PM'),
(2, 'Wahlmodul', 'WW'),
(3, 'Wahlpflichtmodul', 'WM');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `course_dependency`
--
-- Erstellt am: 23. Dez 2016 um 13:31
--

DROP TABLE IF EXISTS `course_dependency`;
CREATE TABLE IF NOT EXISTS `course_dependency` (
  `course_ID` int(11) NOT NULL,
  `pre_course_ID` int(11) NOT NULL,
  `studypath_ID` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Modulabhängigkeiten';

--
-- RELATIONEN DER TABELLE `course_dependency`:
--   `pre_course_ID`
--       `course` -> `uid`
--   `course_ID`
--       `course` -> `uid`
--   `studypath_ID`
--       `studypath` -> `uid`
--

--
-- Daten für Tabelle `course_dependency`
--

INSERT INTO `course_dependency` (`course_ID`, `pre_course_ID`, `studypath_ID`) VALUES
(2, 1, 'I'),
(6, 70, 'I'),
(8, 4, 'I'),
(8, 36, 'I'),
(12, 70, 'I'),
(13, 12, 'I'),
(19, 12, 'I'),
(37, 65, 'I'),
(41, 40, 'I'),
(65, 36, 'I'),
(70, 4, 'I'),
(74, 7, 'I'),
(135, 197, 'I'),
(137, 19, 'I'),
(137, 20, 'I'),
(137, 135, 'I'),
(137, 198, 'I'),
(195, 194, 'I'),
(197, 70, 'I'),
(198, 197, 'I'),
(199, 198, 'I');

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `course_dependency_view`
--
DROP VIEW IF EXISTS `course_dependency_view`;
CREATE TABLE IF NOT EXISTS `course_dependency_view` (
`studypath` char(1)
,`pre_course_id` int(11)
,`modul` varchar(255)
,`vorbedingung` varchar(255)
,`course_id` int(11)
);
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `defaultstudyplan`
--
-- Erstellt am: 23. Dez 2016 um 13:31
--

DROP TABLE IF EXISTS `defaultstudyplan`;
CREATE TABLE IF NOT EXISTS `defaultstudyplan` (
`uid` int(11) NOT NULL,
  `studypath_id` char(1) NOT NULL,
  `name` varchar(45) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Regelstudienplan oder Normstudienplan' AUTO_INCREMENT=3 ;

--
-- RELATIONEN DER TABELLE `defaultstudyplan`:
--   `studypath_id`
--       `studypath` -> `uid`
--

--
-- Daten für Tabelle `defaultstudyplan`
--

INSERT INTO `defaultstudyplan` (`uid`, `studypath_id`, `name`) VALUES
(1, 'A', 'Informatik vollzeit'),
(2, 'A', 'Informatik berufsbegleitend');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `defaultstudyplan_course`
--
-- Erstellt am: 23. Dez 2016 um 13:31
--

DROP TABLE IF EXISTS `defaultstudyplan_course`;
CREATE TABLE IF NOT EXISTS `defaultstudyplan_course` (
`uid` int(11) NOT NULL,
  `semester` tinyint(4) NOT NULL COMMENT 'geplant im Semester Nr. x',
  `semestertype` enum('FS','HS') NOT NULL,
  `defaultstudyplan_ID` int(11) NOT NULL COMMENT 'FK zu DefaultStudyPlan',
  `course_ID` int(11) NOT NULL COMMENT 'FK zu Course'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=54 ;

--
-- RELATIONEN DER TABELLE `defaultstudyplan_course`:
--   `course_ID`
--       `course` -> `uid`
--   `defaultstudyplan_ID`
--       `defaultstudyplan` -> `uid`
--

--
-- Daten für Tabelle `defaultstudyplan_course`
--

INSERT INTO `defaultstudyplan_course` (`uid`, `semester`, `semestertype`, `defaultstudyplan_ID`, `course_ID`) VALUES
(1, 1, 'HS', 2, 7),
(2, 1, 'HS', 2, 4),
(3, 1, 'HS', 2, 36),
(4, 1, 'HS', 2, 194),
(6, 2, 'FS', 2, 1),
(7, 2, 'FS', 2, 70),
(8, 2, 'FS', 2, 65),
(9, 2, 'FS', 2, 195),
(11, 2, 'FS', 2, 44),
(12, 3, 'HS', 2, 40),
(13, 3, 'HS', 2, 2),
(14, 3, 'HS', 2, 8),
(15, 3, 'HS', 2, 37),
(16, 3, 'HS', 2, 45),
(17, 4, 'FS', 2, 41),
(18, 4, 'FS', 2, 3),
(19, 4, 'FS', 2, 6),
(20, 4, 'FS', 2, 12),
(21, 4, 'FS', 2, 196),
(23, 5, 'HS', 2, 5),
(24, 5, 'HS', 2, 13),
(25, 5, 'HS', 2, 19),
(26, 5, 'HS', 2, 9),
(27, 5, 'HS', 2, 11),
(28, 6, 'FS', 2, 74),
(33, 6, 'FS', 2, 67),
(34, 6, 'FS', 2, 78),
(35, 7, 'HS', 2, 191),
(40, 7, 'HS', 2, 10),
(41, 7, 'HS', 2, 14),
(46, 8, 'FS', 2, 135),
(47, 8, 'FS', 2, 20),
(48, 8, 'FS', 2, 192),
(49, 9, 'HS', 2, 137),
(50, 9, 'HS', 2, 193),
(51, 6, 'FS', 2, 197),
(52, 7, 'HS', 2, 198),
(53, 8, 'FS', 2, 199);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `examtype`
--
-- Erstellt am: 23. Dez 2016 um 13:30
--

DROP TABLE IF EXISTS `examtype`;
CREATE TABLE IF NOT EXISTS `examtype` (
`uid` int(11) NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Art des Kompetenznachweis' AUTO_INCREMENT=4 ;

--
-- Daten für Tabelle `examtype`
--

INSERT INTO `examtype` (`uid`, `name`, `description`) VALUES
(1, 'Pa', 'abgesetzte Prüfung'),
(2, 'Pb', 'Erfahrungs- und Prüfungsnachweis'),
(3, 'E', 'Erfahrungsnachweis');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `executionslot`
--
-- Erstellt am: 23. Dez 2016 um 13:31
--

DROP TABLE IF EXISTS `executionslot`;
CREATE TABLE IF NOT EXISTS `executionslot` (
`uid` int(11) NOT NULL,
  `room` varchar(45) DEFAULT NULL,
  `start` time DEFAULT NULL,
  `end` varchar(45) DEFAULT NULL,
  `dayofweek` int(11) DEFAULT NULL,
  `professor` varchar(45) DEFAULT NULL,
  `courseexecution_id` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Durchführungszeiten' AUTO_INCREMENT=209 ;

--
-- RELATIONEN DER TABELLE `executionslot`:
--   `courseexecution_id`
--       `courseexecution` -> `uid`
--

--
-- Daten für Tabelle `executionslot`
--

INSERT INTO `executionslot` (`uid`, `room`, `start`, `end`, `dayofweek`, `professor`, `courseexecution_id`) VALUES
(1, '608', '08:20:00', '09:55:00', 1, 'TEC1', 92),
(2, '302', '10:20:00', '11:55:00', 1, 'BIE1', 20),
(3, '306', '12:45:00', '14:20:00', 1, 'RLM1', 2),
(4, '306', '08:20:00', '11:55:00', 2, 'DSA2', 10),
(5, '406', '12:45:00', '14:20:00', 2, 'RLM1', 2),
(6, '406,407', '14:25:00', '16:10:00', 2, 'ELM1,JZD1', 103),
(7, '604', '08:20:00', '09:55:00', 3, 'LHF1', 92),
(8, '510', '10:20:00', '11:55:00', 3, 'MYC1', 80),
(9, '608', '12:45:00', '14:20:00', 3, 'DSA2', 10),
(10, '304,406', '14:25:00', '16:10:00', 3, 'DTD1,PSM2', 124),
(11, '303', '14:25:00', '16:10:00', 3, 'BEM1', 120),
(12, '208', '10:20:00', '11:55:00', 4, 'MYC1', 80),
(13, '208', '12:45:00', '16:10:00', 4, 'BIE1', 20),
(14, '306', '16:15:00', '17:50:00', 4, 'POH1', 113),
(15, '407', '16:15:00', '17:50:00', 4, 'CRV1', 115),
(16, 'O.22a', '16:15:00', '17:50:00', 4, 'SAG1', 115),
(17, '304', '08:20:00', '09:55:00', 5, 'MYC1', 80),
(18, 'O.22a', '10:20:00', '11:55:00', 5, 'SAG1', 111),
(19, '308', '08:20:00', '09:55:00', 1, 'BGW1', 79),
(20, '608', '10:20:00', '11:55:00', 1, 'TEC1', 91),
(21, 'N.521', '12:45:00', '14:20:00', 1, 'BIE1', 19),
(22, '604', '08:20:00', '09:55:00', 2, 'LHF1', 91),
(23, '608', '10:20:00', '11:55:00', 2, 'DOJ1,FRC1', 9),
(24, '608', '12:45:00', '14:20:00', 2, 'DOJ1,FRC1', 9),
(25, '406,407', '14:25:00', '16:10:00', 2, 'ELM1,JZD1', 102),
(26, '503', '08:20:00', '11:55:00', 3, 'LPL1', 1),
(27, '303', '12:45:00', '14:20:00', 3, 'BGW1', 79),
(28, '304,406', '14:25:00', '16:10:00', 3, 'DTD1,PSM2', 123),
(29, '303', '14:25:00', '16:10:00', 3, 'BEM1', 119),
(30, '401', '08:20:00', '11:55:00', 4, 'BIE1', 19),
(31, '303', '12:45:00', '14:20:00', 4, 'DOJ1,FRC1', 9),
(32, '407', '14:25:00', '16:10:00', 4, 'CRV1', 109),
(33, '308', '16:15:00', '17:50:00', 4, 'VUT1', 107),
(34, '406', '16:15:00', '17:50:00', 4, 'PSM2', 106),
(35, '407', '16:15:00', '17:50:00', 4, 'CRV1', 114),
(36, 'O.22a', '16:15:00', '17:50:00', 4, 'SAG1', 114),
(37, '306', '16:15:00', '17:50:00', 4, 'POH1', 112),
(38, '303', '18:10:00', '19:45:00', 4, 'POH1', 116),
(39, '509', '08:20:00', '09:55:00', 5, 'BGW1', 79),
(40, 'O.22a', '10:20:00', '11:55:00', 5, 'SAG1', 110),
(41, '201', '18:10:00', '19:45:00', 1, 'SFM1', 78),
(42, '201', '19:55:00', '21:30:00', 1, 'SRU2', 18),
(43, '201', '16:15:00', '17:50:00', 2, 'KMS4,SRU2', 8),
(44, '201', '18:10:00', '19:45:00', 2, 'SRU2', 18),
(45, '206', '19:55:00', '21:30:00', 2, 'DTD1', 122),
(46, '201,207', '19:55:00', '21:30:00', 2, 'KET1,PSM2', 118),
(47, '201', '08:20:00', '11:55:00', 5, 'KMS4,SRU2', 8),
(48, '201', '12:45:00', '14:20:00', 5, 'SFM1', 78),
(49, '201', '14:25:00', '16:10:00', 5, 'SFM1', 78),
(50, '201', '16:15:00', '17:50:00', 5, 'SRU2', 18),
(51, '206', '18:10:00', '19:45:00', 1, 'SRU2', 17),
(52, '206', '19:55:00', '21:30:00', 1, 'EBH1', 77),
(53, '107', '16:15:00', '17:50:00', 2, 'HNR1,LUA1', 7),
(54, '206', '18:10:00', '19:45:00', 2, 'EBH1', 77),
(55, '206', '19:55:00', '21:30:00', 2, 'DTD1', 121),
(56, '201,207', '19:55:00', '21:30:00', 2, 'KET1,PSM2', 117),
(57, '202', '08:20:00', '11:55:00', 5, 'HNR1,LUA1', 7),
(58, '208', '12:45:00', '16:10:00', 5, 'SRU2', 17),
(59, '208', '16:15:00', '17:50:00', 5, 'EBH1', 77),
(60, '406', '08:20:00', '11:55:00', 1, 'DUE1', 33),
(61, '406', '12:45:00', '14:20:00', 1, 'BLK2', 16),
(62, '510', '08:20:00', '09:55:00', 2, 'FRL1', 84),
(63, '603', '10:20:00', '11:55:00', 2, 'TEC1', 94),
(64, 'N.111,N.311', '12:45:00', '16:10:00', 2, 'FLU1', 31),
(65, 'N.521', '08:20:00', '09:55:00', 3, 'FRL1', 84),
(66, 'N.521', '10:20:00', '11:55:00', 3, 'DUE1', 33),
(67, 'N.521', '12:45:00', '14:20:00', 3, 'LHP2', 14),
(68, '406', '08:20:00', '09:55:00', 4, 'LHP2', 14),
(69, '603', '10:20:00', '11:55:00', 4, 'LHF1', 94),
(70, '406', '12:45:00', '14:20:00', 4, 'DUE1', 33),
(71, '405', '08:20:00', '09:55:00', 5, 'KNM2', 6),
(72, '405', '10:20:00', '11:55:00', 5, 'BLK2', 16),
(73, 'N.111,N.521', '08:20:00', '11:55:00', 1, 'MDA1', 30),
(74, 'N.522', '08:20:00', '09:55:00', 2, 'FKD1', 83),
(75, 'N.522', '10:20:00', '11:55:00', 2, 'BEO1', 32),
(76, '603', '12:45:00', '14:20:00', 2, 'TEC1', 93),
(77, '509', '08:20:00', '09:55:00', 3, 'ERJ1', 15),
(78, '509', '10:20:00', '11:55:00', 3, 'BEO1', 32),
(79, '509', '12:45:00', '14:20:00', 3, 'BEO1', 32),
(80, '509', '14:25:00', '16:10:00', 3, 'LHP2', 13),
(81, '603', '08:20:00', '09:55:00', 4, 'LHF1', 93),
(82, '507', '10:20:00', '11:55:00', 4, 'LHP2', 13),
(83, '604', '12:45:00', '14:20:00', 4, 'ERJ1', 15),
(84, '405', '08:20:00', '09:55:00', 5, 'KNM2', 5),
(85, '406', '10:20:00', '11:55:00', 5, 'FKD1', 83),
(86, '406', '12:45:00', '14:20:00', 5, 'BEO1', 32),
(87, '105', '18:10:00', '19:45:00', 1, 'SWP1', 22),
(88, '105', '19:55:00', '21:30:00', 1, 'SWP1', 22),
(89, '206', '16:15:00', '17:50:00', 3, 'SFM1', 82),
(90, '206', '18:10:00', '21:30:00', 3, 'AAU1', 4),
(91, '206', '08:20:00', '09:55:00', 5, 'LHJ1', 90),
(92, '206', '10:20:00', '11:55:00', 5, 'BHG1', 90),
(93, '101', '12:45:00', '14:20:00', 5, 'SWP1', 22),
(94, '105', '14:25:00', '16:10:00', 5, 'VUT1', 105),
(95, '105', '16:15:00', '17:50:00', 5, 'SFM1', 82),
(96, '106', '16:15:00', '17:50:00', 2, 'FRL1', 81),
(97, '106', '18:10:00', '21:30:00', 2, 'AAU1', 3),
(98, '106', '18:10:00', '19:45:00', 3, 'FRL1', 81),
(99, '106', '19:55:00', '21:30:00', 3, 'SWP1', 21),
(100, '104', '08:20:00', '09:55:00', 5, 'BHG1', 89),
(101, '104', '10:20:00', '11:55:00', 5, 'LHJ1', 89),
(102, '104', '12:45:00', '14:20:00', 5, 'VUT1', 104),
(103, '104', '14:25:00', '16:10:00', 5, 'SWP1', 21),
(104, '104', '16:15:00', '17:50:00', 5, 'SWP1', 21),
(105, '405', '08:20:00', '09:55:00', 1, 'PKS1', 41),
(106, '405', '10:20:00', '11:55:00', 1, 'PKS1', 41),
(107, '604', '12:45:00', '14:20:00', 1, 'KNS1,NLT1', 97),
(108, '603', '12:45:00', '14:20:00', 1, 'TEC1', 101),
(109, '304', '14:25:00', '16:10:00', 1, 'SFM1', 88),
(110, '603', '14:25:00', '16:10:00', 1, 'TEC1', 101),
(111, '405', '16:15:00', '17:50:00', 1, 'RDF1', 135),
(112, '405', '18:10:00', '19:45:00', 1, 'RDF1', 138),
(113, 'N.421', '08:20:00', '11:55:00', 2, 'BIE1,FHS1,LHP2', 52),
(114, 'N.421', '12:45:00', '14:20:00', 2, 'BEO1', 27),
(115, 'N.421', '14:25:00', '16:10:00', 2, 'PRM1', 56),
(116, 'N.321', '08:20:00', '09:55:00', 3, 'MLL2', 62),
(117, 'N.321', '10:20:00', '11:55:00', 3, 'HSM4', 71),
(118, 'N.321', '12:45:00', '14:20:00', 3, 'VGJ1', 74),
(119, 'N.321', '14:25:00', '16:10:00', 3, 'HNR1', 67),
(120, '302', '16:15:00', '17:50:00', 3, 'HDD1', 129),
(121, 'N.521', '08:20:00', '11:55:00', 4, 'BLK2,ERJ1,GZR1,HNR1,SWP1', 48),
(122, 'N.319', '08:20:00', '11:55:00', 5, 'PRM1,STU1', 44),
(123, 'N.321', '08:20:00', '11:55:00', 5, 'BTE1,HEG1,WGH1', 43),
(124, 'N.311', '08:20:00', '11:55:00', 5, 'ARB1,KLU1', 45),
(125, 'N.521', '08:20:00', '11:55:00', 5, 'DSA2,FLU1,GZR1,MDM1', 42),
(126, 'N.319', '12:45:00', '16:10:00', 5, 'GZR1,JFR1', 44),
(127, 'N.321', '12:45:00', '16:10:00', 5, 'BTE1,HEG1,WGH1', 43),
(128, 'N.311', '12:45:00', '16:10:00', 5, 'ARB1,HSM4', 45),
(129, 'N.521', '12:45:00', '16:10:00', 5, 'DSA2,SHM3', 42),
(130, 'N.421', '16:15:00', '17:50:00', 5, 'HIF1', 58),
(131, '208', '18:10:00', '19:45:00', 1, 'WGH1', 29),
(132, '208,Inf-Lab', '19:55:00', '21:30:00', 1, 'WGH1', 29),
(133, '103,Inf-Lab', '16:15:00', '17:50:00', 3, 'BEO1,BLK2,ERJ1,HEG1,KLJ1,PRM1,RLM1,SWP1', 47),
(134, '104', '18:10:00', '19:45:00', 3, 'GZR1,HIF1', 35),
(135, '103,Inf-Lab', '19:55:00', '21:30:00', 3, 'BEO1,BLK2,ERJ1,HEG1,KLJ1,PRM1,RLM1', 47),
(136, '103,Inf-Lab', '08:20:00', '09:55:00', 5, 'BEO1,ERJ1,KLJ1,RLM1,SWP1', 47),
(137, '103,Inf-Lab', '10:20:00', '11:55:00', 5, 'BEO1,ERJ1,KLJ1,RLM1,SWP1', 47),
(138, '105', '12:45:00', '14:20:00', 5, 'ERJ1', 24),
(139, '209', '14:25:00', '17:50:00', 5, 'BLK2', 12),
(140, '107', '18:10:00', '21:30:00', 2, 'BLK2', 11),
(141, '104', '16:15:00', '17:50:00', 3, 'GZR1,HIF1', 34),
(142, '103,Inf-Lab', '18:10:00', '19:45:00', 3, 'BEO1,BLK2,ERJ1,HEG1,KLJ1,PRM1,RLM1,SWP1', 46),
(143, '103,Inf-Lab', '19:55:00', '21:30:00', 3, 'BEO1,BLK2,ERJ1,HEG1,KLJ1,PRM1,RLM1', 46),
(144, '103,Inf-Lab', '08:20:00', '09:55:00', 5, 'BEO1,ERJ1,KLJ1,RLM1,SWP1', 46),
(145, '103,Inf-Lab', '10:20:00', '11:55:00', 5, 'BEO1,ERJ1,KLJ1,RLM1,SWP1', 46),
(146, '105', '12:45:00', '14:20:00', 5, 'ERJ1', 23),
(147, '106', '14:25:00', '16:10:00', 5, 'WGH1', 28),
(148, '106,Inf-Lab', '16:15:00', '17:50:00', 5, 'WGH1', 28),
(149, '202,205', '16:15:00', '19:45:00', 2, 'LHS2,PKS1', 40),
(150, '202', '19:55:00', '21:30:00', 2, 'BEO1', 26),
(151, '202,205', '16:15:00', '19:45:00', 2, 'LHS2,PKS1', 39),
(152, '202', '19:55:00', '21:30:00', 2, 'BEO1', 25),
(153, '405', '08:20:00', '09:55:00', 1, 'PKS1', 38),
(154, '405', '10:20:00', '11:55:00', 1, 'PKS1', 38),
(155, '604', '12:45:00', '14:20:00', 1, 'KNS1,NLT1', 96),
(156, '603', '12:45:00', '14:20:00', 1, 'TEC1', 100),
(157, '603', '14:25:00', '16:10:00', 1, 'TEC1', 100),
(158, '304', '14:25:00', '16:10:00', 1, 'SFM1', 87),
(159, '405', '16:15:00', '17:50:00', 1, 'RDF1', 134),
(160, '405', '18:10:00', '19:45:00', 1, 'RDF1', 137),
(161, 'N.421', '08:20:00', '11:55:00', 2, 'BIE1,FHS1,LHP2', 51),
(162, 'N.421', '14:25:00', '16:10:00', 2, 'PRM1', 55),
(163, 'N.321', '08:20:00', '09:55:00', 3, 'MLL2', 61),
(164, 'N.321', '10:20:00', '11:55:00', 3, 'HSM4', 70),
(165, 'N.321', '12:45:00', '14:20:00', 3, 'VGJ1', 73),
(166, 'N.321', '14:25:00', '16:10:00', 3, 'HNR1', 66),
(167, '302', '16:15:00', '17:50:00', 3, 'HDD1', 128),
(168, '101', '08:20:00', '11:55:00', 6, 'VUT1', 108),
(169, '202', '14:25:00', '16:10:00', 1, 'ARB1,HLR2,OSI1', 76),
(170, '208', '16:15:00', '17:50:00', 1, 'HDD1', 127),
(171, '207', '16:15:00', '17:50:00', 1, 'KET1', 125),
(172, '202', '16:15:00', '17:50:00', 1, 'WGH1', 64),
(173, '207', '18:10:00', '19:45:00', 1, 'RZL1', 68),
(174, '202', '18:10:00', '19:45:00', 1, 'TEC1', 99),
(175, '207', '19:55:00', '21:30:00', 1, 'RLM1', 53),
(176, '202,205', '16:15:00', '19:45:00', 2, 'LHS2,PKS1', 37),
(177, '207', '16:15:00', '17:50:00', 2, 'TEC1', 99),
(178, '207', '14:25:00', '16:10:00', 3, 'LLA1', 130),
(179, '201', '16:15:00', '17:50:00', 3, 'KLU1', 63),
(180, '207', '16:15:00', '17:50:00', 3, 'LLA1', 131),
(181, '202', '16:15:00', '17:50:00', 3, 'JAS1', 132),
(182, '202', '18:10:00', '19:45:00', 3, 'JAS1', 132),
(183, '201', '18:10:00', '19:45:00', 3, 'KLU1', 63),
(184, '208', '18:10:00', '19:45:00', 3, 'SFM1', 85),
(185, '207', '18:10:00', '19:45:00', 3, 'LLA1', 130),
(186, '201', '19:55:00', '21:30:00', 3, 'SFM1', 85),
(187, '207', '19:55:00', '21:30:00', 3, 'LLA1', 131),
(188, '202', '16:15:00', '19:45:00', 4, 'ERJ1,SWP1', 49),
(189, '207', '16:15:00', '17:50:00', 4, 'VAR1', 59),
(190, '207', '18:10:00', '19:45:00', 4, 'KMS4', 75),
(191, '405', '08:20:00', '09:55:00', 1, 'PKS1', 36),
(192, '405', '10:20:00', '11:55:00', 1, 'PKS1', 36),
(193, '604', '12:45:00', '14:20:00', 1, 'KNS1,NLT1', 95),
(194, '603', '12:45:00', '14:20:00', 1, 'TEC1', 98),
(195, '603', '14:25:00', '16:10:00', 1, 'TEC1', 98),
(196, '304', '14:25:00', '16:10:00', 1, 'SFM1', 86),
(197, '405', '16:15:00', '17:50:00', 1, 'RDF1', 133),
(198, '405', '18:10:00', '19:45:00', 1, 'RDF1', 136),
(199, 'N.421', '08:20:00', '11:55:00', 2, 'BIE1,FHS1,LHP2', 50),
(200, 'N.421', '14:25:00', '16:10:00', 2, 'PRM1', 54),
(201, 'N.321', '08:20:00', '09:55:00', 3, 'MLL2', 60),
(202, 'N.321', '10:20:00', '11:55:00', 3, 'HSM4', 69),
(203, 'N.321', '12:45:00', '14:20:00', 3, 'VGJ1', 72),
(204, 'N.321', '14:25:00', '16:10:00', 3, 'HNR1', 65),
(205, '302', '16:15:00', '17:50:00', 3, 'HDD1', 126),
(206, 'N.421', '16:15:00', '17:50:00', 5, 'HIF1', 57),
(208, '', '16:15:00', '17:50:00', 1, 'KET1', 140);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `lecturer`
--
-- Erstellt am: 23. Dez 2016 um 13:30
--

DROP TABLE IF EXISTS `lecturer`;
CREATE TABLE IF NOT EXISTS `lecturer` (
`uid` int(11) NOT NULL,
  `code` char(4) NOT NULL COMMENT 'natural id',
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Dozent, Professor' AUTO_INCREMENT=330 ;

--
-- Daten für Tabelle `lecturer`
--

INSERT INTO `lecturer` (`uid`, `code`, `name`) VALUES
(167, 'AAR4', 'Robert Ackermann'),
(168, 'AAU1', 'Urs Ackermann'),
(169, 'AEB1', 'Beatrice Amrhein'),
(170, 'AOM1', 'Martin Aebersold'),
(171, 'ARB1', 'Bernhard Anrig'),
(172, 'ATP1', 'Peter Affolter'),
(173, 'BAM1', 'Marcel Baak'),
(174, 'BEM1', 'Marylou Bregy'),
(175, 'BEO1', 'Olivier Biberstein'),
(176, 'BES1', 'Serge Bignens'),
(177, 'BGL1', 'Luciano Borgna'),
(178, 'BGW1', 'Walter Businger'),
(179, 'BHG1', 'Guido Bucher'),
(180, 'BIE1', 'Emmanuel Benoist'),
(181, 'BIN3', 'Norman Urs Baier'),
(182, 'BKT2', 'Thomas Bürkle'),
(183, 'BNJ1', 'Jan Brunner'),
(184, 'BOO1', 'Olivier Boss'),
(185, 'BRL1', 'Leo Bürki'),
(186, 'BTD1', 'Daniel Bättig'),
(187, 'BTE1', 'Endre Bangerter'),
(188, 'BUJ1', 'Jürg Bleuer'),
(189, 'CIP1', 'Pierre-André Chevalier'),
(190, 'CMP1', 'Pierre Comte'),
(191, 'CSJ1', 'Jan Czerwinski'),
(192, 'CTP1', 'Philippe Christen'),
(193, 'DHS1', 'Sarah Dégallier Rochat'),
(194, 'DIV', ' Div.'),
(195, 'DND1', 'Daniel Debrunner'),
(196, 'DOA1', 'André Droux'),
(197, 'DOB2', 'Bertrand Dutoit'),
(198, 'DOJ1', 'Jean-Paul Dubois'),
(199, 'DSA2', 'Andreas Danuser'),
(200, 'DTD1', 'Derek Doucette'),
(201, 'DUE1', 'Eric Dubuis'),
(202, 'DZJ1', 'Jürg Dänzer'),
(203, 'EEB1', 'Beat Engeli'),
(204, 'ELM1', 'Marcel Eggler'),
(205, 'ERJ1', 'Jürgen Eckerle'),
(206, 'FHS1', 'Stephan Fischli'),
(207, 'FKD1', 'David Frenkel'),
(208, 'FLS2', 'Stéphane Félix'),
(209, 'FLU1', 'Ulrich Fiedler'),
(210, 'FRA4', 'Axel Fuerst'),
(211, 'FRC1', 'Claude Fuhrer'),
(212, 'FRL1', 'Lorenz Frey'),
(213, 'FRS5', 'Stefan Martin Funariu'),
(214, 'FSM1', 'Max Felser'),
(215, 'FUE1', 'Elham Firouzi'),
(216, 'GEP2', 'Pascal Gaggero'),
(217, 'GRK1', 'Kurt Graf'),
(218, 'GTB1', 'Bernhard Gerster'),
(219, 'GZR1', 'Rolf Gasenzer'),
(220, 'HDD1', 'Doris Hennebert'),
(221, 'HEG1', 'Gerhard Hassenstein'),
(222, 'HEH2', 'Horst Heck'),
(223, 'HGA3', 'Andreas Habegger'),
(224, 'HIF1', 'Frank Helbling'),
(225, 'HIP2', 'Phoebe Hoidn Ubertini'),
(226, 'HKM1', 'Michael Höckel'),
(227, 'HLR2', 'Roland Hungerbühler'),
(228, 'HNR1', 'Rolf Haenni'),
(229, 'HOJ2', 'Jürgen Holm'),
(230, 'HSM4', 'Marcus Hudritsch'),
(231, 'HYE1', 'Elmar Hayoz'),
(232, 'JFR1', 'Rolf Jufer'),
(233, 'JKD1', 'Daniel Junker'),
(234, 'JMM1', 'Marcel Jacomet'),
(235, 'JTJ1', 'Jörn Justiz'),
(236, 'JZD1', 'Diego Jannuzzo'),
(237, 'KEM4', 'Martin Kucera'),
(238, 'KET1', 'Thomas Krebs'),
(239, 'KKG1', 'Gerhard Krucker'),
(240, 'KLC2', 'Christian Koblet'),
(241, 'KLJ1', 'Joachim W. Kaltz'),
(242, 'KLU1', 'Urs Künzler'),
(243, 'KMS4', 'Simon Kramer'),
(244, 'KNM2', 'Muriel Künzi'),
(245, 'KNM7', 'Micha Kernen'),
(246, 'KNS1', 'Simon Kleiner'),
(247, 'KOV1', 'Volker M. Koch'),
(248, 'KPA1', 'Annette Kipka'),
(249, 'KTT1', 'Ties Jan Kluter'),
(250, 'KUP1', 'Peter Kunz'),
(251, 'LAD1', 'Daniel Lanz'),
(252, 'LAK1', 'Kurt Lehmann'),
(253, 'LAM9', 'Michael Lehmann'),
(254, 'LAR1', 'Rolf Lanz'),
(255, 'LGD2', 'David Luggen'),
(256, 'LHF1', 'Florian Löwenthal'),
(257, 'LHJ1', 'Jan Locher'),
(258, 'LHM3', 'Markus Lörtscher'),
(259, 'LHP2', 'Philipp Locher'),
(260, 'LHS2', 'Sibylle Loetscher'),
(261, 'LLA1', 'Alexander Leu'),
(262, 'LNR1', 'Remo Lauener'),
(263, 'LPL1', 'Luciano Lopez'),
(264, 'LUA1', 'Annett Laube'),
(265, 'MAY1', 'Yves Mussard'),
(266, 'MDA1', 'Abdelatif Mokeddem'),
(267, 'MDM1', 'Mohamed Mokdad'),
(268, 'MHS1', 'Sébastien Mariéthoz'),
(269, 'MIC1', 'Christoph Meier'),
(270, 'MLL2', 'Lorenz Müller'),
(271, 'MLU4', 'Urs Muntwyler'),
(272, 'MOO1', 'Olivier Mermoud'),
(273, 'MRD2', 'Damien Maurer'),
(274, 'MSD1', 'Daniela Moser'),
(275, 'MSL1', 'Lukas Moser'),
(276, 'MTL3', 'Lorenz Martin'),
(277, 'MYC1', 'Christian Meyer'),
(278, 'NDB1', 'Beat Neuenschwander'),
(279, 'NLT1', 'Thomas Nelis'),
(280, 'NSS2', 'Stephan Nüssli'),
(281, 'NST2', 'Thomas Niederhauser'),
(282, 'OSI1', 'Ivo Adrian Oesch'),
(283, 'OUM1', 'Moez Oumi'),
(284, 'PGG1', 'Giampaolo Possagno'),
(285, 'PKS1', 'Sibylle Peuker'),
(286, 'PNA2', 'Asieh Parsania'),
(287, 'PRM1', 'Marcel Pfahrer'),
(288, 'PSM2', 'Marie-Anne Pinheiro'),
(289, 'RAR6', 'Roland Rombach'),
(290, 'RAV1', 'Valerio Romano'),
(291, 'RDF1', 'Francisco Rodal'),
(292, 'RGH1', 'Hans Röthlisberger'),
(293, 'RKD1', 'Daniel Rikli'),
(294, 'RLA2', 'Andrea Ridolfi'),
(295, 'RLM1', 'Michael Röthlin'),
(296, 'RRH1', 'Hansjürg Rohrer'),
(297, 'RUU1', 'Ulrich Rettenmund'),
(298, 'RZL1', 'Lutz Rosenpflanzer'),
(299, 'SAG1', 'Gabriella Scorrano-Sovilla'),
(300, 'SAG2', 'Giuliano Soldati'),
(301, 'SAH1', 'Heinrich Schwarzenbach'),
(302, 'SFM1', 'Marx Stampfli'),
(303, 'SHA1', 'Andreas Stahel'),
(304, 'SHR5', 'Reto Spöhel'),
(305, 'SIB2', 'Beat Schmied'),
(306, 'SLP5', 'Patrick Schwaller'),
(307, 'SMM8', 'Marc Schmid'),
(308, 'SND1', 'Daniel Saner'),
(309, 'SRA3', 'Anton Schärer'),
(310, 'SRU2', 'Ueli Schrag'),
(311, 'STN2', 'Nino Sutter'),
(312, 'STU1', 'Urs Sauter'),
(313, 'SUB1', 'Bernard Schmutz'),
(314, 'SWP1', 'Peter Schwab'),
(315, 'TEC1', 'Christian Thiess'),
(316, 'TLS1', 'Sebastian Tobler'),
(317, 'TOG1', 'Gerhard Tschopp'),
(318, 'TPM1', 'Michel Tripet'),
(319, 'ULJ1', 'Jean-François Urwyler'),
(320, 'VAR1', 'Roger Villars'),
(321, 'VGJ1', 'Jürgen Vogel'),
(322, 'VIA1', 'Andrea Vezzini'),
(323, 'VOR2', 'Rolf Vogt'),
(324, 'VTR1', 'Rolf Vetter'),
(325, 'VUT1', 'Thomas von Burg'),
(326, 'WBR1', 'Roger Weber'),
(327, 'WDJ1', 'Jasmin Wandel'),
(328, 'WGB2', 'Benjamin Wolfsberger'),
(329, 'WGH1', 'Hansjürg Wenger');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `plan`
--
-- Erstellt am: 05. Jan 2017 um 08:45
--

DROP TABLE IF EXISTS `plan`;
CREATE TABLE IF NOT EXISTS `plan` (
`uid` int(11) NOT NULL,
  `student_ID` int(11) NOT NULL,
  `semester` int(11) NOT NULL,
  `course_ID` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Planung, Planbuchungen' AUTO_INCREMENT=27 ;

--
-- RELATIONEN DER TABELLE `plan`:
--   `course_ID`
--       `course` -> `uid`
--   `student_ID`
--       `student` -> `uid`
--

--
-- Daten für Tabelle `plan`
--

INSERT INTO `plan` (`uid`, `student_ID`, `semester`, `course_ID`) VALUES
(22, 3, 201701, 135),
(26, 3, 201701, 191);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `result`
--
-- Erstellt am: 23. Dez 2016 um 13:32
--

DROP TABLE IF EXISTS `result`;
CREATE TABLE IF NOT EXISTS `result` (
`uid` int(11) NOT NULL,
  `grade` enum('A','B','C','D','E','FX','F') NOT NULL,
  `semester` int(11) NOT NULL,
  `course_ID` int(11) NOT NULL,
  `student_ID` int(11) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COMMENT='Resultate, Noten, Ergebnisse' AUTO_INCREMENT=40 ;

--
-- RELATIONEN DER TABELLE `result`:
--   `student_ID`
--       `student` -> `uid`
--   `course_ID`
--       `course` -> `uid`
--

--
-- Daten für Tabelle `result`
--

INSERT INTO `result` (`uid`, `grade`, `semester`, `course_ID`, `student_ID`) VALUES
(1, 'A', 201302, 7, 3),
(2, 'E', 201302, 4, 3),
(3, 'B', 201302, 36, 3),
(4, 'C', 201401, 1, 3),
(5, 'D', 201401, 70, 3),
(6, 'E', 201401, 65, 3),
(7, 'B', 201401, 44, 3),
(11, 'A', 201402, 40, 3),
(12, 'D', 201402, 2, 3),
(13, 'A', 201402, 8, 3),
(14, 'D', 201402, 37, 3),
(15, 'D', 201402, 45, 3),
(18, 'E', 201501, 41, 3),
(19, 'C', 201501, 3, 3),
(20, 'B', 201501, 6, 3),
(21, 'B', 201501, 12, 3),
(25, 'A', 201502, 5, 3),
(26, 'C', 201502, 13, 3),
(27, 'D', 201502, 19, 3),
(28, 'A', 201502, 9, 3),
(29, 'B', 201502, 11, 3),
(32, 'A', 201601, 74, 3),
(33, 'E', 201601, 67, 3),
(34, 'A', 201601, 78, 3),
(35, 'C', 201302, 54, 3),
(36, 'B', 201401, 112, 3),
(37, 'E', 201501, 114, 3),
(38, 'D', 201601, 128, 3),
(39, 'D', 201601, 29, 3);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `result_view`
--
DROP VIEW IF EXISTS `result_view`;
CREATE TABLE IF NOT EXISTS `result_view` (
`code` varchar(30)
,`title` varchar(255)
,`type` char(2)
,`group` varchar(2)
,`semester` int(11)
,`language` varchar(2)
,`grade` enum('A','B','C','D','E','FX','F')
,`ects` tinyint(4)
,`student_id` int(11)
,`course_id` int(11)
);
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student`
--
-- Erstellt am: 06. Jan 2017 um 08:49
--

DROP TABLE IF EXISTS `student`;
CREATE TABLE IF NOT EXISTS `student` (
`uid` int(11) NOT NULL,
  `password` varchar(50) NOT NULL,
  `abbreviation` varchar(50) NOT NULL,
  `firstname` varchar(30) NOT NULL,
  `lastname` varchar(50) NOT NULL,
  `matriculationnumber` varchar(20) DEFAULT NULL,
  `matriculationdate` date DEFAULT NULL,
  `upcomingsemester` tinyint(4) unsigned DEFAULT '1' COMMENT 'kommt ins semester x',
  `totalsemester` tinyint(4) unsigned DEFAULT NULL,
  `studypath_ID` char(1) DEFAULT NULL,
  `defaultstudyplan_ID` int(11) DEFAULT NULL,
  `booking_confirmed` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- RELATIONEN DER TABELLE `student`:
--   `defaultstudyplan_ID`
--       `defaultstudyplan` -> `uid`
--   `studypath_ID`
--       `studypath` -> `uid`
--

--
-- Daten für Tabelle `student`
--

INSERT INTO `student` (`uid`, `password`, `abbreviation`, `firstname`, `lastname`, `matriculationnumber`, `matriculationdate`, `upcomingsemester`, `totalsemester`, `studypath_ID`, `defaultstudyplan_ID`, `booking_confirmed`) VALUES
(1, 'kaspar', 'engek1', 'Kaspar', 'Engel', '11-636-578', '2012-02-01', 9, 9, 'I', 2, 0),
(2, 'andreas', 'affoa1', 'Andreas', 'Andreas', '12-***-***', '2016-07-01', 1, 6, 'I', 1, 0),
(3, 'beat', 'bierb1', 'Beat', 'Bieri', '13-***-***', '2013-01-01', 7, 9, 'I', 2, 0),
(4, 'christian', 'chric1', 'Christian', 'Christen', '10-***-***', '2014-06-01', 4, 6, 'I', 1, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `student_courseexecution`
--
-- Erstellt am: 23. Dez 2016 um 13:32
--

DROP TABLE IF EXISTS `student_courseexecution`;
CREATE TABLE IF NOT EXISTS `student_courseexecution` (
  `student_ID` int(11) NOT NULL,
  `courseexecution_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Modulbuchung';

--
-- RELATIONEN DER TABELLE `student_courseexecution`:
--   `courseexecution_ID`
--       `courseexecution` -> `uid`
--   `student_ID`
--       `student` -> `uid`
--

--
-- Daten für Tabelle `student_courseexecution`
--

INSERT INTO `student_courseexecution` (`student_ID`, `courseexecution_ID`) VALUES
(3, 26),
(3, 37),
(3, 140);

-- --------------------------------------------------------

--
-- Stellvertreter-Struktur des Views `student_courseexecution_slot_view`
--
DROP VIEW IF EXISTS `student_courseexecution_slot_view`;
CREATE TABLE IF NOT EXISTS `student_courseexecution_slot_view` (
`student_ID` int(11)
,`courseexecution_ID` int(11)
,`slot_id` int(11)
,`room` varchar(45)
,`start` time
,`end` varchar(45)
,`dayofweek` int(11)
,`professor` varchar(45)
,`place` varchar(45)
,`classname` varchar(45)
,`semester` int(11)
,`coursecode` varchar(30)
,`course_name_de` varchar(255)
,`course_name_fr` varchar(255)
,`coursetype` char(2)
,`coursegroup` varchar(2)
,`examtype` varchar(45)
,`ects` tinyint(4)
);
-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `studypath`
--
-- Erstellt am: 23. Dez 2016 um 13:29
--

DROP TABLE IF EXISTS `studypath`;
CREATE TABLE IF NOT EXISTS `studypath` (
  `uid` char(1) NOT NULL,
  `title_de` varchar(45) DEFAULT NULL,
  `title_fr` varchar(45) DEFAULT NULL,
  `sorting` int(11) DEFAULT NULL,
  `department` char(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Studienrichtung - Studiengang (StudyPath)';

--
-- Daten für Tabelle `studypath`
--

INSERT INTO `studypath` (`uid`, `title_de`, `title_fr`, `sorting`, `department`) VALUES
('A', 'BSc Automobiltechnik', 'BSc Technique automobile', 1, 'TI'),
('E', 'BSc Elektro- und Kommunikationstechnik', 'BSc Électricité et systèmes de communication', 2, 'TI'),
('F', 'BSc Mikro- und Medizintechnik', 'BSc Microtechnique et technique médicale', 3, 'TI'),
('I', 'BSc Informatik', 'BSc Informatique', 4, 'TI'),
('M', 'BSc Maschinentechnik', 'BSc Maschinentechnik', 5, 'TI'),
('X', 'BSc Medizininformatik', 'BSc Informatique médicale', 6, 'TI');

-- --------------------------------------------------------

--
-- Struktur des Views `courseexecution_view`
--
DROP TABLE IF EXISTS `courseexecution_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`studienplaner`@`%` SQL SECURITY DEFINER VIEW `courseexecution_view` AS select `ex`.`uid` AS `uid`,`ex`.`executioncode` AS `executioncode`,`ex`.`studypath_id` AS `studypath_id`,`ex`.`place` AS `place`,`ex`.`classname` AS `classname`,`ex`.`semester` AS `semester`,`ex`.`course_id` AS `course_id`,`co`.`code` AS `coursecode`,`co`.`name_de` AS `course_name_de`,`co`.`name_fr` AS `course_name_fr`,`ct`.`shortName` AS `coursetype`,`cg`.`shortName` AS `coursegroup`,`et`.`name` AS `examtype`,`co`.`ects` AS `ects` from ((((`courseexecution` `ex` join `course` `co` on((`ex`.`course_id` = `co`.`uid`))) join `coursetype` `ct` on((`co`.`type` = `ct`.`uid`))) join `coursegroup` `cg` on((`co`.`coursegroup` = `cg`.`uid`))) join `examtype` `et` on((`co`.`examType` = `et`.`uid`)));

-- --------------------------------------------------------

--
-- Struktur des Views `course_dependency_view`
--
DROP TABLE IF EXISTS `course_dependency_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`studienplaner`@`%` SQL SECURITY DEFINER VIEW `course_dependency_view` AS select `cd`.`studypath_ID` AS `studypath`,`cd`.`pre_course_ID` AS `pre_course_id`,`c1`.`name_de` AS `modul`,`c2`.`name_de` AS `vorbedingung`,`cd`.`course_ID` AS `course_id` from ((`course_dependency` `cd` join `course` `c1` on((`c1`.`uid` = `cd`.`course_ID`))) join `course` `c2` on((`c2`.`uid` = `cd`.`pre_course_ID`)));

-- --------------------------------------------------------

--
-- Struktur des Views `result_view`
--
DROP TABLE IF EXISTS `result_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`studienplaner`@`%` SQL SECURITY DEFINER VIEW `result_view` AS select `c`.`code` AS `code`,`c`.`name_de` AS `title`,`t`.`shortName` AS `type`,`g`.`shortName` AS `group`,`r`.`semester` AS `semester`,'de' AS `language`,`r`.`grade` AS `grade`,`c`.`ects` AS `ects`,`r`.`student_ID` AS `student_id`,`c`.`uid` AS `course_id` from (((`result` `r` join `course` `c` on((`r`.`course_ID` = `c`.`uid`))) join `coursetype` `t` on((`c`.`type` = `t`.`uid`))) join `coursegroup` `g` on((`c`.`coursegroup` = `g`.`uid`)));

-- --------------------------------------------------------

--
-- Struktur des Views `student_courseexecution_slot_view`
--
DROP TABLE IF EXISTS `student_courseexecution_slot_view`;

CREATE ALGORITHM=UNDEFINED DEFINER=`studienplaner`@`%` SQL SECURITY DEFINER VIEW `student_courseexecution_slot_view` AS select `student`.`student_ID` AS `student_ID`,`student`.`courseexecution_ID` AS `courseexecution_ID`,`slot`.`uid` AS `slot_id`,`slot`.`room` AS `room`,`slot`.`start` AS `start`,`slot`.`end` AS `end`,`slot`.`dayofweek` AS `dayofweek`,`slot`.`professor` AS `professor`,`courseex`.`place` AS `place`,`courseex`.`classname` AS `classname`,`courseex`.`semester` AS `semester`,`courseex`.`coursecode` AS `coursecode`,`courseex`.`course_name_de` AS `course_name_de`,`courseex`.`course_name_fr` AS `course_name_fr`,`courseex`.`coursetype` AS `coursetype`,`courseex`.`coursegroup` AS `coursegroup`,`courseex`.`examtype` AS `examtype`,`courseex`.`ects` AS `ects` from ((`student_courseexecution` `student` join `courseexecution_view` `courseex` on((`student`.`courseexecution_ID` = `courseex`.`uid`))) join `executionslot` `slot` on((`slot`.`courseexecution_id` = `student`.`courseexecution_ID`)));

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
 ADD PRIMARY KEY (`uid`), ADD UNIQUE KEY `code_UNIQUE` (`code`), ADD KEY `type` (`type`), ADD KEY `FK_course_coursegroup` (`coursegroup`), ADD KEY `FK_course_examtype_idx` (`examType`);

--
-- Indexes for table `courseexecution`
--
ALTER TABLE `courseexecution`
 ADD PRIMARY KEY (`uid`), ADD KEY `studypath_id` (`studypath_id`), ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `coursegroup`
--
ALTER TABLE `coursegroup`
 ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `coursetype`
--
ALTER TABLE `coursetype`
 ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `course_dependency`
--
ALTER TABLE `course_dependency`
 ADD PRIMARY KEY (`course_ID`,`pre_course_ID`,`studypath_ID`), ADD KEY `FK_course_precond_idx` (`pre_course_ID`), ADD KEY `FK_studypath` (`studypath_ID`);

--
-- Indexes for table `defaultstudyplan`
--
ALTER TABLE `defaultstudyplan`
 ADD PRIMARY KEY (`uid`), ADD KEY `studypath_id` (`studypath_id`);

--
-- Indexes for table `defaultstudyplan_course`
--
ALTER TABLE `defaultstudyplan_course`
 ADD PRIMARY KEY (`uid`), ADD KEY `defaultstudyplan_ID` (`defaultstudyplan_ID`), ADD KEY `course` (`course_ID`);

--
-- Indexes for table `examtype`
--
ALTER TABLE `examtype`
 ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `executionslot`
--
ALTER TABLE `executionslot`
 ADD PRIMARY KEY (`uid`), ADD KEY `FK_executionslot_courseexecution_idx` (`courseexecution_id`);

--
-- Indexes for table `lecturer`
--
ALTER TABLE `lecturer`
 ADD PRIMARY KEY (`uid`), ADD UNIQUE KEY `code_UNIQUE` (`code`);

--
-- Indexes for table `plan`
--
ALTER TABLE `plan`
 ADD PRIMARY KEY (`uid`), ADD KEY `FK_plan_course_idx` (`course_ID`), ADD KEY `FK_plan_student_idx` (`student_ID`);

--
-- Indexes for table `result`
--
ALTER TABLE `result`
 ADD PRIMARY KEY (`uid`), ADD KEY `course_ID` (`course_ID`,`student_ID`), ADD KEY `student_ID` (`student_ID`), ADD KEY `course_ID_2` (`course_ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
 ADD PRIMARY KEY (`uid`), ADD KEY `studypath_ID` (`studypath_ID`), ADD KEY `defaultstudyplan_ID` (`defaultstudyplan_ID`);

--
-- Indexes for table `student_courseexecution`
--
ALTER TABLE `student_courseexecution`
 ADD PRIMARY KEY (`student_ID`,`courseexecution_ID`), ADD KEY `FK_courseexecution_idx` (`courseexecution_ID`);

--
-- Indexes for table `studypath`
--
ALTER TABLE `studypath`
 ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=200;
--
-- AUTO_INCREMENT for table `courseexecution`
--
ALTER TABLE `courseexecution`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=141;
--
-- AUTO_INCREMENT for table `coursegroup`
--
ALTER TABLE `coursegroup`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `coursetype`
--
ALTER TABLE `coursetype`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `defaultstudyplan`
--
ALTER TABLE `defaultstudyplan`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `defaultstudyplan_course`
--
ALTER TABLE `defaultstudyplan_course`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=54;
--
-- AUTO_INCREMENT for table `examtype`
--
ALTER TABLE `examtype`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `executionslot`
--
ALTER TABLE `executionslot`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=209;
--
-- AUTO_INCREMENT for table `lecturer`
--
ALTER TABLE `lecturer`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=330;
--
-- AUTO_INCREMENT for table `plan`
--
ALTER TABLE `plan`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=27;
--
-- AUTO_INCREMENT for table `result`
--
ALTER TABLE `result`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=40;
--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `course`
--
ALTER TABLE `course`
ADD CONSTRAINT `FK_course_coursegroup` FOREIGN KEY (`coursegroup`) REFERENCES `coursegroup` (`uid`),
ADD CONSTRAINT `FK_course_coursetype` FOREIGN KEY (`type`) REFERENCES `coursetype` (`uid`),
ADD CONSTRAINT `FK_course_examtype` FOREIGN KEY (`examType`) REFERENCES `examtype` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `courseexecution`
--
ALTER TABLE `courseexecution`
ADD CONSTRAINT `FK_courseexecution_course` FOREIGN KEY (`course_id`) REFERENCES `course` (`uid`),
ADD CONSTRAINT `FK_courseexecution_studypath` FOREIGN KEY (`studypath_id`) REFERENCES `studypath` (`uid`);

--
-- Constraints der Tabelle `course_dependency`
--
ALTER TABLE `course_dependency`
ADD CONSTRAINT `FK_course_precond` FOREIGN KEY (`pre_course_ID`) REFERENCES `course` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_course_self` FOREIGN KEY (`course_ID`) REFERENCES `course` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_studypath` FOREIGN KEY (`studypath_ID`) REFERENCES `studypath` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `defaultstudyplan`
--
ALTER TABLE `defaultstudyplan`
ADD CONSTRAINT `FK_defaultstudyplan_studypath` FOREIGN KEY (`studypath_id`) REFERENCES `studypath` (`uid`);

--
-- Constraints der Tabelle `defaultstudyplan_course`
--
ALTER TABLE `defaultstudyplan_course`
ADD CONSTRAINT `FK_course` FOREIGN KEY (`course_ID`) REFERENCES `course` (`uid`),
ADD CONSTRAINT `FK_defaultstudyplan` FOREIGN KEY (`defaultstudyplan_ID`) REFERENCES `defaultstudyplan` (`uid`);

--
-- Constraints der Tabelle `executionslot`
--
ALTER TABLE `executionslot`
ADD CONSTRAINT `FK_executionslot_courseexecution` FOREIGN KEY (`courseexecution_id`) REFERENCES `courseexecution` (`uid`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints der Tabelle `plan`
--
ALTER TABLE `plan`
ADD CONSTRAINT `FK_plan_course` FOREIGN KEY (`course_ID`) REFERENCES `course` (`uid`),
ADD CONSTRAINT `FK_plan_student` FOREIGN KEY (`student_ID`) REFERENCES `student` (`uid`);

--
-- Constraints der Tabelle `result`
--
ALTER TABLE `result`
ADD CONSTRAINT `FK_result_course` FOREIGN KEY (`course_ID`) REFERENCES `course` (`uid`),
ADD CONSTRAINT `FK_result_student` FOREIGN KEY (`student_ID`) REFERENCES `student` (`uid`);

--
-- Constraints der Tabelle `student`
--
ALTER TABLE `student`
ADD CONSTRAINT `FK_student_defaultstudyplan` FOREIGN KEY (`defaultstudyplan_ID`) REFERENCES `defaultstudyplan` (`uid`),
ADD CONSTRAINT `FK_student_studypath` FOREIGN KEY (`studypath_ID`) REFERENCES `studypath` (`uid`);

--
-- Constraints der Tabelle `student_courseexecution`
--
ALTER TABLE `student_courseexecution`
ADD CONSTRAINT `FK_courseexecution` FOREIGN KEY (`courseexecution_ID`) REFERENCES `courseexecution` (`uid`),
ADD CONSTRAINT `FK_student` FOREIGN KEY (`student_ID`) REFERENCES `student` (`uid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
