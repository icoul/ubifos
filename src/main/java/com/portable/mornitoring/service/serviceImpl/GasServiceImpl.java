package com.portable.mornitoring.service.serviceImpl;

import java.util.List;

import javax.persistence.*;

import com.portable.mornitoring.dto.GasLogDTO;
import com.portable.mornitoring.service.GasService;

import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;

@Service
public class GasServiceImpl implements GasService {
  @PersistenceContext
  private EntityManager em;
  
  public List<GasLogDTO> findGasGroupByModule() {
    String sql = "select CAST(glt2.log_idx AS SIGNED) AS logIdx, " +
                "      glt2.A1 AS o2, " +
                "      glt2.A1 < 18 AS o2Status, " + 
                "      glt2.A2 AS h2s, " +
                "      glt2.A2 > 25 AS h2sStatus, " + 
                "      glt2.A3 AS co, " +
                "      glt2.A3 > 10 AS coStatus, " + 
                "      glt2.A4 AS ch4, " +
                "      glt2.A4 > 10 AS ch4Status, " +
                "      glt2.A5 AS co2, " +
                "      glt2.A5 > 1.5 AS co2Status, " + 
                "      timediff(glt2.rgst_dt, now()) < '-00:03:00' AS noneStatus, " +
                "      glt2.battery, " +
                "      glt2.rgst_dt AS rgstDt, " +
                "      m.module_idx AS moduleIdx, " +
                "      m.model_nm AS modelNm " +
                "from gas_log_tb glt2 left join " +
                "( " +
                  "SELECT max(glt.log_idx) AS log_idx, glt.module_idx " +
                  "FROM (SELECT * FROM gas_log_tb ORDER BY log_idx DESC LIMIT 100000) glt " +
                  "GROUP BY MODULE_IDX " +
                ") a on glt2.log_idx = a.log_idx " +
                "LEFT JOIN (SELECT * FROM module_tb WHERE del_flag = 0) m ON a.MODULE_IDX = m.MODULE_IDX " +
                "WHERE m.module_idx is not null " + 
                "ORDER BY m.module_idx ";

    Query nativeQuery = em.createNativeQuery(sql);
    JpaResultMapper jpaResultMapper = new JpaResultMapper();
    List<GasLogDTO> result = jpaResultMapper.list(nativeQuery, GasLogDTO.class);

    return result;
  }
}
