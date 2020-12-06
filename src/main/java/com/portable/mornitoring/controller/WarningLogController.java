package com.portable.mornitoring.controller;

import java.text.ParseException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import com.portable.mornitoring.entity.WarningLog;
import com.portable.mornitoring.dto.LogCsvDTO;
import com.portable.mornitoring.entity.Gas;
import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.repository.GasRepository;
import com.portable.mornitoring.repository.ModuleRepository;
import com.portable.mornitoring.repository.WarningLogRepository;
import com.portable.mornitoring.service.WarningLogService;
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
public class WarningLogController {
  @Autowired
  GasRepository gasRepository;
  @Autowired
  ModuleRepository moduleRepository;
  @Autowired
  WarningLogRepository warningLogRepository;
  @Autowired
  WarningLogService warningLogService;

  @GetMapping(path = "/api/get/warning")
  public Page<WarningLog> getGasDataInPage(@RequestParam("beginDate") String beginDate,
                                           @RequestParam("endDate") String endDate, 
                                           @RequestParam("moduleIdx") int moduleIdx,
                                           @RequestParam("pageIndex") int pageIndex,
                                           @RequestParam("pageSize") int pageSize) throws ParseException {
    Pageable page = PageableRequest.setPageableObject(pageIndex, pageSize);

    if (moduleIdx == 0) {
      Page<WarningLog> result = warningLogRepository.findByRgstDtBetweenOrderByRgstDtDesc(Utils.convertStringToDate(beginDate), Utils.convertStringToDate(endDate), page);
      
      return result;
    }

    Module module = moduleRepository.findByModuleIdx(moduleIdx);
    Page<WarningLog> result = warningLogRepository.findByModuleAndRgstDtBetweenOrderByRgstDtDesc(module, Utils.convertStringToDate(beginDate), Utils.convertStringToDate(endDate), page);
    
    return result;
  }

  @GetMapping(path = "/api/get/log/csv")
  public List<LogCsvDTO> getWarningDataInPage(@RequestParam("beginDate") String beginDate,
                                    @RequestParam("endDate") String endDate, 
                                    @RequestParam("moduleIdx") int moduleIdx) throws ParseException {
    List<LogCsvDTO> result = warningLogService.findWarningLogForCsv(moduleIdx, beginDate, endDate);
    
    return result;
  }

  @PostMapping(path = "/api/set/warning")
  public WarningLog setWarningLog(@RequestBody HashMap<String, Object> obj) {
    Gas gas = gasRepository.findByLogIdx((Integer)obj.get("logIdx"));
    List<WarningLog> duplLog = warningLogRepository.findByGas(gas);

    if (duplLog.size() > 0) {
      return null;
    }
    
    Module module = moduleRepository.findByModuleIdx((Integer)obj.get("moduleIdx"));

    WarningLog warningLog = new WarningLog();
    warningLog.setGas(gas);
    warningLog.setModule(module);
    warningLog.setStatus((String)obj.get("status"));
    warningLog.setRgstDt(new Date());
    
    return warningLogRepository.save(warningLog);
  }
}
