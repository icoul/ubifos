package com.portable.mornitoring.dto;

import java.math.BigInteger;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GasLogDTO {
  private BigInteger logIdx;
  private Double o2;
  private Integer o2Status;
  private Double h2s;
  private Integer h2sStatus;
  private Double co;
  private Integer coStatus;
  private Double ch4;
  private Integer ch4Status;
  private Double co2;
  private Integer co2Status;
  private Integer noneStatus;
  private String battery;
  private Date rgstDt;
  private Integer moduleIdx;
  private String modelNm;
}