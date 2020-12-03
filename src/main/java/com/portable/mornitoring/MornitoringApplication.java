package com.portable.mornitoring;

import com.portable.mornitoring.serial.AbstractSpringSerialPortConnector;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MornitoringApplication extends AbstractSpringSerialPortConnector {

	public static void main(String[] args) {
		SpringApplication.run(MornitoringApplication.class, args);
	}

	@Override
	public void processData(String line) {

	}
}
