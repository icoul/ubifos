package com.portable.mornitoring.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.portable.mornitoring.entity.WarningLog;
import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.repository.ModuleRepository;
import com.portable.mornitoring.repository.WarningLogRepository;
import com.portable.mornitoring.utils.PageableRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WarningLogController {
  @Autowired
  ModuleRepository moduleRepository;
  @Autowired
  WarningLogRepository warningLogRepository;

  @GetMapping(path = "/api/get/warning")
  public Page<WarningLog> getGasDataInPage(@RequestParam("beginDate") String beginDate,
                                           @RequestParam("endDate") String endDate, 
                                           @RequestParam("moduleIdx") int moduleIdx,
                                           @RequestParam("pageIndex") int pageIndex,
                                           @RequestParam("pageSize") int pageSize) throws ParseException {
    Pageable page = PageableRequest.setPageableObject(pageIndex, pageSize);

    if (moduleIdx == 0) {
      Page<WarningLog> result = warningLogRepository.findByRgstDtBetween(convertStringToDate(beginDate), convertStringToDate(endDate), page);
      
      return result;
    }

    Module module = moduleRepository.findByModuleIdx(moduleIdx);
    Page<WarningLog> result = warningLogRepository.findByModuleAndRgstDtBetween(module, convertStringToDate(beginDate), convertStringToDate(endDate), page);
    
    return result;
  }

  public Date convertStringToDate(String date) throws ParseException {
    SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return transFormat.parse(date);
  }
}
