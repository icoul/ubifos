package com.portable.mornitoring.repository;

import java.util.Date;

import com.portable.mornitoring.entity.LocationLog;
import com.portable.mornitoring.entity.Module;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationLogRepository extends JpaRepository<LocationLog, Integer> {
  Page<LocationLog> findByModuleAndRgstDtBetweenOrderByRgstDtDesc(Module module, Date beginDate, Date endDate, Pageable pageable);
}
