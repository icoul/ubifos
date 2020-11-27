package com.portable.mornitoring.repository;

import com.portable.mornitoring.entity.Module;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {
  Module findByModuleIdx(int moduleIdx);
}
