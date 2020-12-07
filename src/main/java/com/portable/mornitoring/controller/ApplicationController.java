package com.portable.mornitoring.controller;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.Enumeration;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApplicationController {
  @GetMapping(path = "/api/get/ip")
  public String home() throws UnknownHostException, SocketException {
    NetworkInterface networkInterface = NetworkInterface.getByName("eth0");
    Enumeration<InetAddress> inetAddress = networkInterface.getInetAddresses();
    InetAddress currentAddress;
    currentAddress = inetAddress.nextElement();
    return currentAddress.getHostAddress();
	}
}
