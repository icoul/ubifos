package com.portable.mornitoring.service;

import com.portable.mornitoring.entity.ModuleValue;
import com.portable.mornitoring.entity.Modules;

public interface ModuleService {
  String updateModule(ModuleValue updateModule);

  String deleteModule(Modules deleteModule);
}
