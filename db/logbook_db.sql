/*
 Source Server         : xampp
 Source Server Type    : MySQL
 Source Server Version : 100427
 Source Host           : localhost:3306
 Source Schema         : logbook_db

 Target Server Type    : MySQL
 Target Server Version : 100427
 File Encoding         : 65001

 Date: 09/04/2023 11:57:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for logs_tbl
-- ----------------------------
DROP TABLE IF EXISTS `logs_tbl`;
CREATE TABLE `logs_tbl`  (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `account_no` int NOT NULL,
  `date_entry` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_in` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `time_out` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of logs_tbl
-- ----------------------------
INSERT INTO `logs_tbl` VALUES (1, 1, '2023-04-09', '11:46 AM', '11:51 AM');

-- ----------------------------
-- Table structure for personnel_tbl
-- ----------------------------
DROP TABLE IF EXISTS `personnel_tbl`;
CREATE TABLE `personnel_tbl`  (
  `account_no` int NOT NULL AUTO_INCREMENT,
  `personnel_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `department` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `post_prof` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `is_activated` tinyint(1) UNSIGNED ZEROFILL NOT NULL,
  PRIMARY KEY (`account_no`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of personnel_tbl
-- ----------------------------
INSERT INTO `personnel_tbl` VALUES (1, 'Roald', 'IT', 'Junior', 1);

-- ----------------------------
-- View structure for entry_logs
-- ----------------------------
DROP VIEW IF EXISTS `entry_logs`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `entry_logs` AS SELECT 
	logs_tbl.account_no,
	logs_tbl.log_id,
	personnel_tbl.personnel_name,
	personnel_tbl.post_prof,
	logs_tbl.date_entry,
	logs_tbl.time_in,
	logs_tbl.time_out
FROM personnel_tbl
JOIN logs_tbl on logs_tbl.account_no = personnel_tbl.account_no ;

SET FOREIGN_KEY_CHECKS = 1;
