package com.portable.mornitoring.controller;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.portable.mornitoring.serial.SpringSerialPortConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SerialController {
  private final Logger log = LoggerFactory.getLogger(this.getClass());

  @Autowired
  SpringSerialPortConnector springSerialPortConnector;

  @GetMapping(path = "/api/serial/lp")
  public void sendMessage(@RequestParam("code") String code) throws IOException {
    log.info("메시지 송신: " + code);
    springSerialPortConnector.sendMessage(code);
  }
}
