package com.portable.mornitoring.service;

import java.util.List;

import com.portable.mornitoring.dto.LogCsvDTO;

public interface WarningLogService {
  List<LogCsvDTO> findWarningLogForCsv(int moduleIdx, String beginDate, String endDate);
}
