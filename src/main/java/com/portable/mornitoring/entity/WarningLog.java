package com.portable.mornitoring.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "warning_log_tb")
public class WarningLog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "warning_log_idx", nullable = true)
  private int warningLogIdx;

  @OneToOne
  @JoinColumn(name = "log_idx")
  private Gas gas;

  @ManyToOne
  @JoinColumn(name = "module_idx")
  private Module module;

  @Column(name = "status")
  private String status;

  @Column(name = "rgst_dt")
  private Date rgstDt;
}

