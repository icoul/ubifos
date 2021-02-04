package com.portable.mornitoring.dto;

import java.math.BigInteger;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LocationLogDTO {
  private BigInteger logIdx;
  private Double latitude;
  private Double longitude;
  private String gpstime;
  private Integer major;
  private Integer minor;
  private String macAddr;
  private Double bssi;
  private Double rssi;
  private Double sf;
  private Double freqeuncy;
  private Double snr;
  private String battery;
  private Date rgstDt;
  private Integer moduleIdx;
  private String modelNm;
}
