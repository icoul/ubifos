package com.portable.mornitoring.repository;

import java.util.Date;

import com.portable.mornitoring.entity.WarningLog;
import com.portable.mornitoring.entity.Module;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WarningLogRepository extends JpaRepository<WarningLog, Integer> {
  Page<WarningLog> findByRgstDtBetween(Date beginDate, Date endDate, Pageable pageable);
  Page<WarningLog> findByModuleAndRgstDtBetween(Module module, Date beginDate, Date endDate, Pageable pageable);
}
