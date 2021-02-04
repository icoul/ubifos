package com.portable.mornitoring.service;

import java.util.List;

import com.portable.mornitoring.dto.LocationLogDTO;

public interface LocationLogService {
  List<LocationLogDTO> findLocationGroupByModule();
}
