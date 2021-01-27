package com.portable.mornitoring.repository;

import java.util.List;

import com.portable.mornitoring.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
  List<Module> findAll();
  Module findByModuleIdx(int moduleIdx);
}
