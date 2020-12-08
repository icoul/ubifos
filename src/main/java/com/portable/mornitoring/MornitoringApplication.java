package com.portable.mornitoring;

import com.portable.mornitoring.controller.SerialController;
import com.portable.mornitoring.serial.AbstractSpringSerialPortConnector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.messaging.simp.SimpMessageSendingOperations;

@SpringBootApplication
public class MornitoringApplication extends AbstractSpringSerialPortConnector {
	@Autowired
	SerialController serialController;
	@Autowired
	private SimpMessageSendingOperations messagingTemplate;

	Runtime rt = Runtime.getRuntime();
	Process pc = null;

	public static void main(String[] args) {
		SpringApplication.run(MornitoringApplication.class, args);
	}

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
		if (line.contains("LAMPWON")) {
			System.out.println("LAMP WEBSOCKET");
			messagingTemplate.convertAndSend("/topic/return", "1");
		}
	}
}
