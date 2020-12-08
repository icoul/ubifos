package com.portable.mornitoring.controller;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {
  @Autowired
  private SimpMessageSendingOperations messagingTemplate;

  @GetMapping(path = "/api/get/ip")
  public String home() throws UnknownHostException, SocketException {
    NetworkInterface networkInterface = NetworkInterface.getByName("eth0");
    Enumeration<InetAddress> inetAddress = networkInterface.getInetAddresses();
    InetAddress currentAddress;
    currentAddress = inetAddress.nextElement();
    return currentAddress.getHostAddress();
  }

  @GetMapping(path = "/api/send/test")
  public void boradCast(){
    messagingTemplate.convertAndSend("/topic/return", "1");
  }
}
