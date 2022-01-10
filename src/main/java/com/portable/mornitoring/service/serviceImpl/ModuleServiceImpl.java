package com.portable.mornitoring.service.serviceImpl;

import javax.persistence.*;
import javax.transaction.Transactional;

import com.portable.mornitoring.entity.ModuleValue;
import com.portable.mornitoring.repository.ModuleValueRepository;
import com.portable.mornitoring.service.ModuleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ModuleServiceImpl implements ModuleService {
  @PersistenceContext
  private EntityManager em;
  @Autowired
  ModuleValueRepository moduleValueRepository;

  @Transactional
  public String updateModule(ModuleValue updateModule) {
    try {
      moduleValueRepository.save(updateModule);
    } catch (Exception e) {
      String result = e + "";
      return result;
    }
    return "success";
  }
}
