package com.portable.mornitoring.controller;

import com.portable.mornitoring.repository.LocationLogRepository;
import com.portable.mornitoring.service.LocationLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationLogController {
  @Autowired
  LocationLogRepository locationLogRepository;
  @Autowired
  LocationLogService locationService;
  
}
