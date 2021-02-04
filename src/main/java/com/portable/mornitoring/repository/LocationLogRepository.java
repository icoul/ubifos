package com.portable.mornitoring.repository;

import com.portable.mornitoring.entity.LocationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LocationLogRepository extends JpaRepository<LocationLog, Integer> {
  
}
