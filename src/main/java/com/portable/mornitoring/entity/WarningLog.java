package com.portable.mornitoring.entity;

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
@Table(name = "warning_log_tb")
public class WarningLog {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "warning_log_idx")
  private int warningLogIdx;
}

