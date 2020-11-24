package com.portable.entity;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "gas_log_tb")
public class Gas {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "log_idx")
  private int logIdx;

  @ManyToOne
  @JoinColumn(name = "module_idx")
  private Module module;

  @Column(name = "`A1`")
  private Double o2;
  @Column(name = "`A2`")
  private Double h2s;
  @Column(name = "`A3`")
  private Double co;
  @Column(name = "`A4`")
  private Double ch4;
  @Column(name = "`A5`")
  private Double co2;

  @Column(name = "`temperature`")
  private Double temperature;
  @Column(name = "`humidity`")
  private Double humidity;
  @Column(name = "`rssi`")
  private Double rssi;
  @Column(name = "`sf`")
  private Double sf;
  @Column(name = "`freqeuncy`")
  private Double freqeuncy;
  @Column(name = "`snr`")
  private Double snr;

  @Column(name = "`battery`")
  private String battery;
  @Column(name = "`rgst_dt`")
  private Date rgstDt;
}
