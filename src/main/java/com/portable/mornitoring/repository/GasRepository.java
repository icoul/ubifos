package com.portable.mornitoring.repository;

import java.util.Date;
import java.util.List;

import com.portable.mornitoring.entity.Gas;
import com.portable.mornitoring.entity.Module;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GasRepository extends JpaRepository<Gas, Integer> {
  Page<Gas> findByModuleAndRgstDtBetween(Module module, 
                                         Date beginDate, 
                                         Date endDate, 
                                         Pageable pageable);
}
