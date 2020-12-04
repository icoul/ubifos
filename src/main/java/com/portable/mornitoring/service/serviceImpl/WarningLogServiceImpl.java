package com.portable.mornitoring.service.serviceImpl;

import java.util.List;

import javax.persistence.*;

import com.portable.mornitoring.dto.LogCsvDTO;
import com.portable.mornitoring.service.WarningLogService;

import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;

@Service
public class WarningLogServiceImpl implements WarningLogService {
  @PersistenceContext
  private EntityManager em;

  public List<LogCsvDTO> findWarningLogForCsv(int moduleIdx, String beginDate, String endDate) {
    String sql = "SELECT m.model_nm AS modelNm, IF(w.status = 'danger', '위험', '미수신') AS status, g.A1 AS o2, g.A2 AS h2s, g.A3 AS co, g.A4 AS ch4, g.A5 AS co2, g.battery, date_format(w.rgst_dt, '%Y-%m-%d %H:%i:%s') AS rgstDt " +
                 "FROM warning_log_tb w LEFT JOIN gas_log_tb g ON w.log_idx = g.log_idx " +
                 "                      LEFT JOIN module_tb m ON w.module_idx = m.module_idx " +
                 "WHERE w.rgst_dt >= '" + beginDate + "' AND w.rgst_dt <= '" + endDate + "' " +
                 (moduleIdx == 0 ? "" : "AND w.module_idx = " + moduleIdx + " ") + 
                 "ORDER BY w.rgst_dt DESC ";

    Query nativeQuery = em.createNativeQuery(sql);
    JpaResultMapper jpaResultMapper = new JpaResultMapper();
    List<LogCsvDTO> result = jpaResultMapper.list(nativeQuery, LogCsvDTO.class);

    return result;
  }
}
