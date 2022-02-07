package com.portable.mornitoring.repository;

import java.util.List;

import com.portable.mornitoring.entity.Modules;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ModulesRepository extends JpaRepository<Modules, Integer> {
  List<Modules> findAll();

  Modules findByModuleIdx(int moduleIdx);

  @Query("SELECT COUNT(m) " +
      "FROM Modules m " +
      "WHERE (m.modelNo = :modelNo OR m.modelNm = :modelNm) AND (m.moduleIdx != :moduleIdx) AND m.delFlag = 0")
  int findByModelNoOrModelNmWithIdx(@Param("modelNo") String modelNo, @Param("modelNm") String modelNm,
      @Param("moduleIdx") Integer moduleIdx);
}