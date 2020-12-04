package com.portable.mornitoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LogCsvDTO {
  private String modelNm;
  private String status;
  private Double o2;
  private Double h2s;
  private Double co;
  private Double ch4;
  private Double co2;
  private String battery;
  private String rgstDt;
}
