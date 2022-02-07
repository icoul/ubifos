package com.portable.mornitoring.service;

import com.portable.mornitoring.entity.ModuleValue;
import com.portable.mornitoring.entity.Modules;

public interface ModuleService {
  String updateModule(ModuleValue updateModule);

  String insertModule(Modules insertModule);

  String editModule(Modules editModule);

  String deleteModule(Modules deleteModule);
}
