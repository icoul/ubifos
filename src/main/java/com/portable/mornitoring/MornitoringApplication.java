package com.portable.mornitoring;

import com.portable.mornitoring.controller.SerialController;
import com.portable.mornitoring.serial.AbstractSpringSerialPortConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MornitoringApplication extends AbstractSpringSerialPortConnector {
	@Autowired
	SerialController serialController;

	public static void main(String[] args) {
		SpringApplication.run(MornitoringApplication.class, args);
	}

	Runtime rt = Runtime.getRuntime();
	Process pc = null;

	@Override
	public void processData(String line) {
		System.out.println("결과 수신 : " + line);

		if (line.contains("PW+OFF")) {
			try {
				pc = rt.exec("sudo shutdown 0");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
