package com.portable.mornitoring.service;

import java.util.List;

import com.portable.mornitoring.dto.GasLogDTO;

public interface GasService {
  List<GasLogDTO> findGasGroupByModule();
}
