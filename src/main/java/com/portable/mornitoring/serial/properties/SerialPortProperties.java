package com.portable.mornitoring.serial.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring-serial-port-connector")
public @Data
class SerialPortProperties {
  /**
   * Port used in the application
   */
  private String portName;

  /**
   * This is the baudRate to use for read and write data in the serial port
   */
  private int baudRate;
}