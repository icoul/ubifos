package com.portable.mornitoring.serial;

import java.io.IOException;

import gnu.io.SerialPortEventListener;

public interface SpringSerialPortConnector extends SerialPortEventListener {
  void sendMessage(String message) throws IOException;
}
