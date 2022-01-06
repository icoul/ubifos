package com.portable.mornitoring.controller;

import java.text.ParseException;
import java.util.List;

import com.portable.mornitoring.dto.GasGraphDTO;
import com.portable.mornitoring.dto.LogCsvDTO;
import com.portable.mornitoring.dto.GasLogDTO;
import com.portable.mornitoring.entity.Gas;
import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.entity.ModuleValue;
import com.portable.mornitoring.repository.GasRepository;
import com.portable.mornitoring.repository.ModuleRepository;
import com.portable.mornitoring.service.GasService;
import com.portable.mornitoring.utils.PageableRequest;
import com.portable.mornitoring.utils.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GasController {
  @Autowired
  GasRepository gasRepository;
  @Autowired
  ModuleRepository moduleRepository;
  @Autowired
  GasService gasService;

  @GetMapping(path = "/api/get/gas/group")
  public List<GasLogDTO> getGasLogByGroup() {
    return gasService.findGasGroupByModule();
  }

  @GetMapping(path = "/api/get/table")
  public Page<Gas> getGasDataInPage(@RequestParam("beginDate") String beginDate,
                                    @RequestParam("endDate") String endDate, 
                                    @RequestParam("moduleIdx") int moduleIdx,
                                    @RequestParam("pageIndex") int pageIndex,
                                    @RequestParam("pageSize") int pageSize) throws ParseException {
    Pageable page = PageableRequest.setPageableObject(pageIndex, pageSize);
    Module module = moduleRepository.findByModuleIdx(moduleIdx);
    Page<Gas> result = gasRepository.findByModuleAndRgstDtBetweenOrderByRgstDtDesc(module, Utils.convertStringToDate(beginDate), Utils.convertStringToDate(endDate), page);
    
    return result;
  }

  @GetMapping(path = "/api/get/csv")
  public List<LogCsvDTO> getGasDataInPage(@RequestParam("beginDate") String beginDate,
                                    @RequestParam("endDate") String endDate, 
                                    @RequestParam("moduleIdx") int moduleIdx) throws ParseException {
    List<LogCsvDTO> result = gasService.findGasLogForCsv(moduleIdx, beginDate, endDate);
    
    return result;
  }

  @GetMapping(path = "/api/get/graph")
  public List<GasGraphDTO> getGasDataInGraph(@RequestParam("beginDate") String beginDate,
                                             @RequestParam("endDate") String endDate, 
                                             @RequestParam("moduleIdx") int moduleIdx) throws ParseException {
    Module module = moduleRepository.findByModuleIdx(moduleIdx);
    List<GasGraphDTO> result = gasService.findByModuleAndRgstDtBetweenByGraph(module, beginDate, endDate);
    
    return result;
  }

  @PostMapping("/api/module/update")
  public String updateModule(@RequestBody ModuleValue updateModule) {
    return gasService.updateModule(updateModule);
  }
}
