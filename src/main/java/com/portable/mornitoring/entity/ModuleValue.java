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
@Table(name = "module_tb")
public class ModuleValue {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "module_idx")
  private int moduleIdx;

  @Column(name = "model_nm")
  private String modelNm;
}
