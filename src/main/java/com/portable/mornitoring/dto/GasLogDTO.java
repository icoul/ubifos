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
  private String o2Status;
  private Double h2s;
  private String h2sStatus;
  private Double co;
  private String coStatus;
  private Double ch4;
  private String ch4Status;
  private Double co2;
  private String co2Status;
  private String noneStatus;
  private String offStatus;
  private String battery;
  private Date rgstDt;
  private Integer moduleIdx;
  private String modelNm;
}