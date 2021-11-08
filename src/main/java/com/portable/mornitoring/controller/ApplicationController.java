package com.portable.mornitoring.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.util.Enumeration;

import javax.xml.bind.DatatypeConverter;

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

  @GetMapping(value="/api/logo/get")
  public String getOneImageByIdx() throws IOException {
    File serverFile = new File("image/logo.png");
    byte[] content = Files.readAllBytes(serverFile.toPath());

    InputStream in = null;
    String base64 = "";
    try {
        in = new FileInputStream(serverFile);
        for (int off = 0, read;
            (read = in.read(content, off, content.length - off)) > 0;
            off += read);

            base64 = DatatypeConverter.printBase64Binary(content);
    } catch (IOException e) {
        // Some error occured
    } finally {
        if (in != null)
            try { in.close(); } catch (IOException e) {}
    }

    return base64;
  }
}
