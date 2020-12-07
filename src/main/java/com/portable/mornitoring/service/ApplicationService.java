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
      pc = rt.exec("/home/pi/ubifos/application.sh &");
     // pc = rt.exec("chromium-browser --noerrdialogs --kiosk http://127.0.0.1:9070 --incognito &");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
