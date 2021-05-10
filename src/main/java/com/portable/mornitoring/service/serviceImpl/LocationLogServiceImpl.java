package com.portable.mornitoring.service.serviceImpl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.portable.mornitoring.dto.LocationLogDTO;
import com.portable.mornitoring.service.LocationLogService;

import org.qlrm.mapper.JpaResultMapper;
import org.springframework.stereotype.Service;

@Service
public class LocationLogServiceImpl implements LocationLogService {
  @PersistenceContext
  private EntityManager em;

  public List<LocationLogDTO> findLocationGroupByModule() {
    String sql = "select CAST(lt2.log_idx AS SIGNED) AS logIdx, " 
        + "      lt2.latitude, "
        + "      lt2.longitude, "
        + "      lt2.gpstime, "
        + "      lt2.major, "
        + "      lt2.minor, "
        + "      lt2.macAddr, "
        + "      lt2.bssi, "
        + "      lt2.rssi, "
        + "      lt2.sf, "
        + "      lt2.freqeuncy, "
        + "      lt2.snr, "
        + "      lt2.battery, "
        + "      lt2.rgst_dt AS rgstDt, " 
        + "      m.module_idx AS moduleIdx, " 
        + "      m.model_nm AS modelNm "
        + "from worker_log_tb lt2 left join " 
        + "( " 
        + "SELECT max(lt.log_idx) AS log_idx, lt.module_idx "
        + "FROM (SELECT * FROM worker_log_tb WHERE latitude != 0 AND longitude != 0 ORDER BY log_idx DESC LIMIT 100000) lt " 
        + "GROUP BY MODULE_IDX "
        + ") a on lt2.log_idx = a.log_idx "
        + "LEFT JOIN (SELECT * FROM module_tb WHERE del_flag = 0) m ON a.MODULE_IDX = m.MODULE_IDX "
        + "WHERE m.module_idx is not null " + "ORDER BY m.module_idx ";

    Query nativeQuery = em.createNativeQuery(sql);
    JpaResultMapper jpaResultMapper = new JpaResultMapper();
    List<LocationLogDTO> result = jpaResultMapper.list(nativeQuery, LocationLogDTO.class);

    return result; 
  }
}
