package com.portable.mornitoring.controller;

import java.net.Inet4Address;
import java.net.UnknownHostException;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {
  @GetMapping(path = "/api/get/ip")
  public String home() throws UnknownHostException {
		return Inet4Address.getLocalHost().getHostAddress();
	}
}
