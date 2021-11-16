package com.portable.mornitoring.service.serviceImpl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import com.portable.mornitoring.entity.GasCriterion;
import com.portable.mornitoring.entity.GasCriterionValue;
import com.portable.mornitoring.repository.GasCriterionRepository;
import com.portable.mornitoring.repository.GasCriterionValueRepository;
import com.portable.mornitoring.service.GasCriterionService;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class GasCriterionServiceImpl implements GasCriterionService {
  @Autowired
  GasCriterionRepository gasCriterionRepository;
  @Autowired
  GasCriterionValueRepository gasCriterionValueRepository;

  /**
   * 가스 단위정보 조회 및 가공. Map 형태
   * Map<가스단위타입명, List<GasCriterion entity>>
   */
  public Map<String, List<GasCriterionValue>> getGasCriterionMapData() {
    Map<String, List<GasCriterionValue>> result = new HashMap<String, List<GasCriterionValue>>();
    List<GasCriterion> gasCriterions = gasCriterionRepository.findByModuleScn("0");

    for (GasCriterion gasCriterion : gasCriterions) {
      List<GasCriterionValue> gasCriterionValues = gasCriterion.getCriterionValueList();
      result.put(gasCriterion.getStatusType().toLowerCase(), gasCriterionValues);
    }

    return result;
  }
  
  /**
   * 가스 단위정보 저장
   */
  @Transactional
  public boolean updateGasCriterion(List<GasCriterion> updateData) {
    try {
      for (GasCriterion gasCriterion : updateData) {
        for (GasCriterionValue gasCriterionValue : gasCriterion.getCriterionValueList()) {
          gasCriterionValueRepository.save(gasCriterionValue);
        }
      }
    } catch (Exception e) {
      return false;
    }
    
    return true;
  }
}