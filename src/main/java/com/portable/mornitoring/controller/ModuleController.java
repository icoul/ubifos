package com.portable.mornitoring.controller;

import java.util.List;

import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.entity.ModuleValue;
import com.portable.mornitoring.entity.Modules;
import com.portable.mornitoring.repository.ModuleRepository;
import com.portable.mornitoring.repository.ModulesRepository;
import com.portable.mornitoring.service.ModuleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ModuleController {
  @Autowired
  ModuleRepository moduleRepository;
  @Autowired
  ModulesRepository modulesRepository;
  @Autowired
  ModuleService moduleService;
  
  @GetMapping(path = "/api/get/modules")
  public List<Module> getModules() {
    List<Module> result = moduleRepository.findAll();
    return result;
  }

  @GetMapping(path = "/api/get/all/modules")
  public List<Modules> getAllModules() {
    List<Modules> result = modulesRepository.findAll();
    return result;
  }

  @PostMapping("/api/module/update")
  public String updateModule(@RequestBody ModuleValue updateModule) {
    return moduleService.updateModule(updateModule);
  }

  @PostMapping(value = "/api/module/insertData")
  public String insertModuleData(@RequestBody Modules insertData) {

    Modules modules = insertData;

    // 장치중복체크
    int duplModuleCounts = modulesRepository.findByModelNoOrModelNm(modules.getModelNo(), modules.getModelNm());
    if (duplModuleCounts > 0) {
      return "duplicate";
    }

    try {
      modules = modulesRepository.save(modules);
    } catch (Exception e) {
      String result = e + "";
      return result;
    }

    return "success";
  }

  @PostMapping("/api/module/updateData")
  public String editModule(@RequestBody Modules editModule) {
    Modules modules = editModule;

    // 장치중복체크
    int duplModuleCountsIdx = modulesRepository.findByModelNoOrModelNmWithIdx(modules.getModelNo(),
        modules.getModelNm(), modules.getModuleIdx());
    if (duplModuleCountsIdx > 0) {
      return "duplicate";
    }

    try {
      modules = modulesRepository.save(modules);
    } catch (Exception e) {
      String result = e + "";
      return result;
    }

    return "success";
  }

  @PostMapping("/api/module/deleteData")
  public String deleteModule(@RequestBody Modules deleteModule) {
    return moduleService.deleteModule(deleteModule);
  }
}
