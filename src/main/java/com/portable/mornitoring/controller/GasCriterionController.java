package com.portable.mornitoring.controller;

import java.util.List;
import java.util.Map;

import com.portable.mornitoring.entity.GasCriterion;
import com.portable.mornitoring.entity.GasCriterionValue;
import com.portable.mornitoring.repository.GasCriterionRepository;
import com.portable.mornitoring.service.GasCriterionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GasCriterionController {
  @Autowired
  public GasCriterionService gasCriterionService;
  @Autowired
  public GasCriterionRepository gasCriterionRepository;
  
  /**
   * 가스 기준데이터 조회 - Map형태
   * @param searchFlag
   * @return
   */
  @GetMapping("/api/gasCriterion/getMapData")
  public Map<String, List<GasCriterionValue>> getGasCriterionMapData() {
    return gasCriterionService.getGasCriterionMapData();
  }

  /**
   * 가스 기준데이터 조회
   * @return
   */
  @GetMapping("/api/gasCriterion/getAllData")
  public List<GasCriterion> getGasCriterionListAllData() {
    return gasCriterionRepository.findAll();
  }

  /**
   * 가스 기준데이터 수정
   * @param updateData
   * @return
   */
  @PostMapping("/api/gasCriterion/update")
  public Boolean updateGasCriterionData(@RequestBody List<GasCriterion> updateData) {
    return gasCriterionService.updateGasCriterion(updateData);
  }
}
