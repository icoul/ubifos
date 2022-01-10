package com.portable.mornitoring.controller;

import java.util.List;

import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.entity.ModuleValue;
import com.portable.mornitoring.repository.ModuleRepository;
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
  ModuleService moduleService;
  
  @GetMapping(path = "/api/get/modules")
  public List<Module> getModules() {
    List<Module> result = moduleRepository.findAll();
    return result;
  }

  @PostMapping("/api/module/update")
  public String updateModule(@RequestBody ModuleValue updateModule) {
    return moduleService.updateModule(updateModule);
  }
}
