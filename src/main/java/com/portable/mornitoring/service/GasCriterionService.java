package com.portable.mornitoring.service;

import java.util.List;
import java.util.Map;

import com.portable.mornitoring.entity.GasCriterion;
import com.portable.mornitoring.entity.GasCriterionValue;

public interface GasCriterionService {
  Map<String, List<GasCriterionValue>> getGasCriterionMapData();
  boolean updateGasCriterion(List<GasCriterion> updateData);
}