package com.portable.mornitoring.service.serviceImpl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.*;

import com.portable.mornitoring.dto.GasGraphDTO;
import com.portable.mornitoring.dto.LogCsvDTO;
import com.portable.mornitoring.dto.GasLogDTO;
import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.service.GasService;

import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;

@Service
public class GasServiceImpl implements GasService {
  @PersistenceContext
  private EntityManager em;

  public List<GasLogDTO> findGasGroupByModule() {
    String sql = "select CAST(glt2.log_idx AS SIGNED) AS logIdx, " + "      glt2.A1 AS o2, "
        + "      CAST(glt2.A1 < 18 AS CHAR(1)) AS o2Status, " + "      glt2.A2 AS h2s, "
        + "      CAST(glt2.A2 > 25 AS CHAR(1)) AS h2sStatus, " + "      glt2.A3 AS co, "
        + "      CAST(glt2.A3 > 10 AS CHAR(1)) AS coStatus, " + "      glt2.A4 AS ch4, "
        + "      CAST(glt2.A4 > 10 AS CHAR(1)) AS ch4Status, " + "      glt2.A5 AS co2, "
        + "      CAST(glt2.A5 > 1.5 AS CHAR(1)) AS co2Status, "
        + "      CAST(timediff(glt2.rgst_dt, now()) < '-00:03:00' AS CHAR(1)) AS noneStatus, " + "      glt2.battery, "
        + "      glt2.rgst_dt AS rgstDt, " + "      m.module_idx AS moduleIdx, " + "      m.model_nm AS modelNm "
        + "from gas_log_tb glt2 left join " + "( " + "SELECT max(glt.log_idx) AS log_idx, glt.module_idx "
        + "FROM (SELECT * FROM gas_log_tb ORDER BY log_idx DESC LIMIT 100000) glt " + "GROUP BY MODULE_IDX "
        + ") a on glt2.log_idx = a.log_idx "
        + "LEFT JOIN (SELECT * FROM module_tb WHERE del_flag = 0) m ON a.MODULE_IDX = m.MODULE_IDX "
        + "WHERE m.module_idx is not null " + "ORDER BY m.module_idx ";

    Query nativeQuery = em.createNativeQuery(sql);
    JpaResultMapper jpaResultMapper = new JpaResultMapper();
    List<GasLogDTO> result = jpaResultMapper.list(nativeQuery, GasLogDTO.class);

    return result; 
  }

  public List<GasGraphDTO> findByModuleAndRgstDtBetweenByGraph(Module module, String beginDate, String endDate)
      throws ParseException {
    String sql = "SELECT MIN(A.A1) o2, MAX(A.A2) h2s, MAX(A.A3) co, MAX(A.A4) ch4, MAX(A.A5) co2, substring(A.rgst_dt, 12, 2) " +
                "FROM " +
                "( " +
                  "SELECT a.* " +
                  "FROM gas_log_tb a " +
                  "WHERE rgst_dt >= '" + beginDate + "' AND rgst_dt <= '" + endDate + "' AND module_idx = " + module.getModuleIdx() + " " +
                  "ORDER BY rgst_dt ASC " +
                ") A " +
                "GROUP BY substring(A.rgst_dt, 1, 13) " +
                "ORDER BY MAX(A.rgst_dt) ASC ";

    Query nativeQuery = em.createNativeQuery(sql);
    JpaResultMapper jpaResultMapper = new JpaResultMapper();
    List<GasGraphDTO> gasDatasFromDatabase = jpaResultMapper.list(nativeQuery, GasGraphDTO.class);

    Map<String, GasGraphDTO> gasGroupByRgstDtMap = new HashMap<String, GasGraphDTO>();

    // 시간을 key, DTO를 value로 한 HashMap
    for (GasGraphDTO gasGraphDTO : gasDatasFromDatabase) {
      gasGroupByRgstDtMap.put(gasGraphDTO.getRgstDt(), gasGraphDTO);
    }

    // 종료시간과 시작시간의 시간차 계산
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-mm-dd HH");
    Date begin = sdf.parse(beginDate); 
    Date end = sdf.parse(endDate); 
    long diff = (end.getTime() - begin.getTime()) / 1000 / 60 / 60;

    List<GasGraphDTO> result = new ArrayList<GasGraphDTO>();
    
    // 시작시간부터 차례대로 해당 시간을 key값으로 가지고 있으면 DTO를 List에 추가
    // 없으면 모든 값이 0인 DTO 인스턴스를 생성하여 추가
    for (int i = 0; i < diff + 1; i++) {
      Calendar cal = GregorianCalendar.getInstance();
      cal.setTime(begin);
      cal.add(Calendar.HOUR_OF_DAY, i);

      Boolean x = gasGroupByRgstDtMap.containsKey(cal.get(Calendar.HOUR_OF_DAY) + "");

      if (x) {
        result.add(gasGroupByRgstDtMap.get(cal.get(Calendar.HOUR_OF_DAY) + ""));
      }
      else {
        GasGraphDTO y = new GasGraphDTO(0.0, 0.0, 0.0, 0.0, 0.0, cal.get(Calendar.HOUR_OF_DAY) + "");
        result.add(y);
      }
    }

    return result;
  }

  public List<LogCsvDTO> findGasLogForCsv(int moduleIdx, String beginDate, String endDate) {
    String sql = "SELECT m.model_nm AS modelNm, g.A1 AS o2, g.A2 AS h2s, g.A3 AS co, g.A4 AS ch4, g.A5 AS co2, g.battery, date_format(g.rgst_dt, '%Y-%m-%d %H:%i:%s') AS rgstDt " +
                 "FROM gas_log_tb g LEFT JOIN module_tb m ON g.module_idx = m.module_idx " +
                 "WHERE g.rgst_dt >= '" + beginDate + "' AND g.rgst_dt <= '" + endDate + "' AND g.module_idx = " + moduleIdx + " " +
                 "ORDER BY g.rgst_dt DESC ";

    Query nativeQuery = em.createNativeQuery(sql);
    JpaResultMapper jpaResultMapper = new JpaResultMapper();
    List<LogCsvDTO> result = jpaResultMapper.list(nativeQuery, LogCsvDTO.class);

    return result;
  }
}
