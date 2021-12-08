CREATE TABLE IF NOT EXISTS `gas_criterion_tb` (
  `gas_criterion_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT 'idx',
  `module_scn` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status_type` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '상태유형',
  `status_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '상태명칭',
  `utm` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '단위',
  `rgst_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '최종수정자',
  `rgst_dt` datetime DEFAULT NULL COMMENT '최종수정일',
  PRIMARY KEY (`gas_criterion_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='가스농도기준';

INSERT INTO `gas_criterion_tb` (`gas_criterion_idx`, `module_scn`, `status_type`, `status_name`, `utm`, `rgst_id`, `rgst_dt`) VALUES
  (1, '0', 'O2', 'O2', '%', 'admin', '2019-08-12 13:02:27'),
  (2, '0', 'CO2', 'CO2', '%', 'admin', '2019-08-12 13:02:27'),
  (3, '0', 'H2S', 'H2S', 'ppm', 'admin', '2019-08-12 13:02:27'),
  (4, '0', 'CO', 'CO', 'ppm', 'admin', '2019-08-12 13:02:27'),
  (5, '0', 'CH4', 'CH4', '%LEL', 'admin', '2019-08-12 13:02:27');

-- 테이블 devubitoms.gas_criterion_value_tb 구조 내보내기
CREATE TABLE IF NOT EXISTS `gas_criterion_value_tb` (
  `criterion_value_idx` int(11) NOT NULL AUTO_INCREMENT COMMENT 'idx',
  `gas_criterion_idx` int(11) DEFAULT NULL COMMENT '상태유형',
  `module_idx` int(11) DEFAULT NULL,
  `stand_type` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '경고기준수치 type a',
  `stand_name` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '경고기준수치 type a',
  `stand_val` double DEFAULT NULL COMMENT '경고기준수치 type a',
  `stand_range` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '경고기준범위 type a',
  `rgst_id` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '최종수정자',
  `rgst_dt` datetime DEFAULT NULL COMMENT '최종수정일',
  PRIMARY KEY (`criterion_value_idx`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='가스농도기준';

INSERT INTO `gas_criterion_value_tb` (`criterion_value_idx`, `gas_criterion_idx`, `module_idx`, `stand_type`, `stand_name`, `stand_val`, `stand_range`, `rgst_id`, `rgst_dt`) VALUES
  (1, 1, NULL, 'criterion', '법적기준', 23.5, 'B', 'admin', '2019-08-12 13:02:27'),
  (4, 1, NULL, 'danger', '위험', 23.5, 'B', 'admin', '2019-08-12 13:02:27'),
  (5, 1, NULL, 'danger', '위험', 19.5, 'C', 'admin', '2019-08-12 13:02:27'),
  (6, 2, NULL, 'criterion', '법적기준', 1.5, 'B', 'admin', '2019-08-12 13:02:27'),
  (7, 2, NULL, 'warning', '경고', 0.2, 'B', 'admin', '2019-08-12 13:02:27'),
  (8, 2, NULL, 'danger', '위험', 0.5, 'B', 'admin', '2019-08-12 13:02:27'),
  (9, 3, NULL, 'criterion', '법적기준', 10, 'B', 'admin', '2019-08-12 13:02:27'),
  (10, 3, NULL, 'warning', '경고', 10, 'B', 'admin', '2019-08-12 13:02:27'),
  (11, 3, NULL, 'danger', '위험', 20, 'B', 'admin', '2019-08-12 13:02:27'),
  (12, 4, NULL, 'criterion', '법적기준', 30, 'B', 'admin', '2019-08-12 13:02:27'),
  (13, 4, NULL, 'warning', '경고', 35, 'B', 'admin', '2019-08-12 13:02:27'),
  (14, 4, NULL, 'danger', '위험', 200, 'B', 'admin', '2019-08-12 13:02:27'),
  (15, 5, NULL, 'criterion', '법적기준', 10, 'B', 'admin', '2019-08-12 13:02:27'),
  (16, 5, NULL, 'warning', '경고', 10, 'B', 'admin', '2019-08-12 13:02:27'),
  (17, 5, NULL, 'danger', '위험', 20, 'B', 'admin', '2019-08-12 13:02:27');

DELIMITER $$
CREATE DEFINER=`root`@`%` FUNCTION `fn_check_gas_density`(`_gas_type` VARCHAR(20),
  `_gas_density` DOUBLE
) RETURNS varchar(20) CHARSET utf8 COLLATE utf8_unicode_ci
    COMMENT '가스농도상태확인'
BEGIN
RETURN (
    SELECT
      CASE 
        WHEN stand_range = 'A' AND  stand_val < _gas_density THEN stand_type
        WHEN stand_range = 'B' AND  stand_val <= _gas_density THEN stand_type
        WHEN stand_range = 'C' AND  stand_val >= _gas_density THEN stand_type
        WHEN stand_range = 'D' AND  stand_val > _gas_density THEN stand_type
        ELSE 'blue'
      END gas_stand
    FROM gas_criterion_value_tb
    WHERE gas_criterion_idx = ( SELECT gas_criterion_idx FROM gas_criterion_tb WHERE status_type = _gas_type ) AND stand_type != 'criterion'
    ORDER BY CASE WHEN gas_stand = 'danger' THEN 1 WHEN gas_stand = 'warning' THEN 2 ELSE 3 END
    LIMIT 1
  );
END$$
DELIMITER ;
