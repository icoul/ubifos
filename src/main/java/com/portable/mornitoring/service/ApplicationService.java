package com.portable.mornitoring.service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

@Service
public class ApplicationService implements CommandLineRunner {
  Runtime rt = Runtime.getRuntime();
  Process pc = null;
  
  @Override
  public void run(String... arg) {
    System.out.println("application start!");

    try {
      pc = rt.exec("sudo /etc/init.d/lightdm restart ");
      pc = rt.exec("sudo killall mirage ");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
