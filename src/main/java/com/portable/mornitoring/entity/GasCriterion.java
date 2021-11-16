package com.portable.mornitoring.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="gas_criterion_tb")
public class GasCriterion{
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "gas_criterion_idx")
  private int criterionIdx;

  @Column(name = "module_scn")
  private String moduleScn;

  @Column(name = "status_type")
  private String statusType;

  @Column(name = "status_name")
  private String statusName;

  @Column(name = "utm")
  private String utm;

  @Column(name = "rgst_id")
  private String rgstId;

  @Column(name = "rgst_dt")
  private Date rgstDt;

  @OneToMany(fetch = FetchType.LAZY, mappedBy = "criterion")
  @OrderBy("standType ASC")
  @JsonManagedReference
  private List<GasCriterionValue> criterionValueList;
}