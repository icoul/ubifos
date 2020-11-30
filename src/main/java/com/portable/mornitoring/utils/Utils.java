package com.portable.mornitoring.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utils {

  public static Date convertStringToDate(String date) throws ParseException {
    SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    return transFormat.parse(date);
  }
}