package com.portable.mornitoring.controller;

import java.util.List;

import com.portable.mornitoring.dto.LocationLogDTO;
import com.portable.mornitoring.repository.LocationLogRepository;
import com.portable.mornitoring.service.LocationLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationLogController {
  @Autowired
  LocationLogRepository locationLogRepository;
  @Autowired
  LocationLogService locationService;

  @GetMapping(path = "/api/get/location/group")
  public List<LocationLogDTO> getLocationLogByGroup() {
    return locationService.findLocationGroupByModule();
  }
}
