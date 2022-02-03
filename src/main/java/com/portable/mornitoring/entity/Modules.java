package com.portable.mornitoring.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "module_tb")
public class Modules {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "module_idx")
  private int moduleIdx;
  @Column(name = "module_scn")
  private int moduleScn;
  @Column(name = "model_no")
  private String modelNo;
  @Column(name = "model_serial")
  private String modelSerial;
  @Column(name = "model_nm")
  private String modelNm;
  @Column(name = "user_nm")
  private String userNm;
  @Column(name = "rgst_id")
  private String rgstId;
  @Column(name = "rgst_dt")
  private Date rgstDt;
  @Column(name = "del_flag")
  private int delFlag;
}
