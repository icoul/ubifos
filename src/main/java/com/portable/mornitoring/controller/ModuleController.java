package com.portable.mornitoring.controller;

import java.util.List;

import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.repository.ModuleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ModuleController {
  @Autowired
  ModuleRepository moduleRepository;
  
  @GetMapping(path = "/api/get/modules")
  public List<Module> getModules() {
    List<Module> result = moduleRepository.findAll();
    return result;
  }
}
