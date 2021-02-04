package com.portable.mornitoring.entity;

import java.util.Date;

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
@Table(name = "worker_log_tb")
public class LocationLog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "log_idx")
  private int logIdx;

  @ManyToOne
  @JoinColumn(name = "module_idx")
  private Module module;

  @Column(name = "`latitude`")
  private Double latitude;
  @Column(name = "`longitude`")
  private Double longitude;
  @Column(name = "`gpstime`")
  private String gpstime;
  @Column(name = "`major`")
  private Integer major;
  @Column(name = "`minor`")
  private Integer minor;
  @Column(name = "`macAddr`")
  private String macAddr;

  @Column(name = "`bssi`")
  private Double bssi;
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
  @Column(name = "rgst_dt")
  private Date rgstDt;
}
