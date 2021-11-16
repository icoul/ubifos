package com.portable.mornitoring.repository;

import java.util.List;

import com.portable.mornitoring.entity.GasCriterion;

import org.springframework.data.repository.PagingAndSortingRepository;


public interface GasCriterionRepository extends PagingAndSortingRepository<GasCriterion, Integer> {
  List<GasCriterion> findAll();
  List<GasCriterion> findByModuleScn(String moduleScn);
  List<GasCriterion> findByStatusTypeAndStatusNameNotLike(String statusType, String statusName);
}