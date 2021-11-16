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

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="gas_criterion_value_tb")
public class GasCriterionValue{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "criterion_value_idx")
  private int criterionValueIdx;

  @ManyToOne(optional = false)
  @JoinColumn(name = "gas_criterion_idx")
  @JsonBackReference
  private GasCriterion criterion;

  @ManyToOne
  @JoinColumn(name = "module_idx")
  private Module module;

  @Column(name = "stand_type")
  private String standType;

  @Column(name = "stand_name")
  private String standName;

  @Column(name = "stand_val")
  private Double standVal;

  @Column(name = "stand_range")
  private String standRange;

  @Column(name = "rgst_id")
  private String rgstId;

  @Column(name = "rgst_dt")
  private Date rgstDt;
}