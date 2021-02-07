package com.portable.mornitoring.controller;

import java.text.ParseException;
import java.util.List;

import com.portable.mornitoring.dto.LocationLogDTO;
import com.portable.mornitoring.entity.LocationLog;
import com.portable.mornitoring.entity.Module;
import com.portable.mornitoring.repository.LocationLogRepository;
import com.portable.mornitoring.repository.ModuleRepository;
import com.portable.mornitoring.service.LocationLogService;
import com.portable.mornitoring.utils.PageableRequest;
import com.portable.mornitoring.utils.Utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationLogController {
  @Autowired
  LocationLogRepository locationLogRepository;
  @Autowired
  LocationLogService locationService;
  @Autowired
  ModuleRepository moduleRepository;

  @GetMapping(path = "/api/get/location/group")
  public List<LocationLogDTO> getLocationLogByGroup() {
    return locationService.findLocationGroupByModule();
  }

  @GetMapping(path = "/api/get/map/table")
  public Page<LocationLog> getLocationLogDataInPage(@RequestParam("beginDate") String beginDate,
                                    @RequestParam("endDate") String endDate, 
                                    @RequestParam("moduleIdx") int moduleIdx,
                                    @RequestParam("pageIndex") int pageIndex,
                                    @RequestParam("pageSize") int pageSize) throws ParseException {
    Pageable page = PageableRequest.setPageableObject(pageIndex, pageSize);
    Module module = moduleRepository.findByModuleIdx(moduleIdx);
    Page<LocationLog> result = locationLogRepository.findByModuleAndRgstDtBetweenOrderByRgstDtDesc(module, Utils.convertStringToDate(beginDate), Utils.convertStringToDate(endDate), page);
    
    return result;
  }
}
