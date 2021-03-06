package com.portable.mornitoring.service;

import java.text.ParseException;
import java.util.List;

import com.portable.mornitoring.dto.GasGraphDTO;
import com.portable.mornitoring.dto.LogCsvDTO;
import com.portable.mornitoring.dto.GasLogDTO;
import com.portable.mornitoring.entity.Module;

public interface GasService {
  List<GasLogDTO> findGasGroupByModule();
  List<GasGraphDTO> findByModuleAndRgstDtBetweenByGraph(Module module, String beginDate, String endDate) throws ParseException;

  List<LogCsvDTO> findGasLogForCsv(int moduleIdx, String beginDate, String endDate);
}
