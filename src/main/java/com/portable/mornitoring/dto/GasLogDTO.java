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
  private BigInteger o2Status;
  private Double h2s;
  private BigInteger h2sStatus;
  private Double co;
  private BigInteger coStatus;
  private Double ch4;
  private BigInteger ch4Status;
  private Double co2;
  private BigInteger co2Status;
  private BigInteger noneStatus;
  private String battery;
  private Date rgstDt;
  private Integer moduleIdx;
  private String modelNm;
}