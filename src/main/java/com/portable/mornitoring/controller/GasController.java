package com.portable.mornitoring.controller;

import java.util.List;

import com.portable.mornitoring.dto.GasLogDTO;
import com.portable.mornitoring.repository.GasRepository;
import com.portable.mornitoring.service.GasService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GasController {
  @Autowired
  GasRepository gasRepository;
  @Autowired
  GasService gasService;

  @GetMapping(path = "/api/get/gas/group")
  public List<GasLogDTO> getGasLogByGroup() {
    return gasService.findGasGroupByModule();
  }
}
