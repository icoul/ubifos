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
      pc = rt.exec("sudo /home/pi/loading/loading.sh ");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
