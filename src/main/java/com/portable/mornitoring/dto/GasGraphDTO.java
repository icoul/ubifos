package com.portable.mornitoring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class GasGraphDTO {
  private Double o2;
  private Double h2s;
  private Double co;
  private Double ch4;
  private Double co2;
  private String rgstDt;
}