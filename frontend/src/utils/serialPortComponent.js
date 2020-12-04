
//////////////////////////////////////////////////////////////////////////////////////////////
// npm install serialport //
import { ret } from 'jquery';
import crc from 'crc';
import { exec } from 'child_process';

// npm install node-redis-crc16 --save
let crc_status = true;

// variables
var errCount = 0;
var realCommand = '';
var resultCommand = '';
let battery = 100;

export function crc_checker(code) {
  let ret_str = '';
  //////////////////////////////////////////
  let temp_str = code + '\r';
  let temp_crc_str = crc.crc16xmodem(temp_str.substring(0,temp_str.indexOf('\r')))
  temp_crc_str = temp_crc_str.toString(16).toUpperCase();

  ret_str = code + '*' + temp_crc_str + '\r';
  return stringChecker(ret_str);
}

function stringChecker(stringCommand){
  if(stringCommand.indexOf("\r") !== -1){
    if(stringCommand.substring(0,5) === 'CRCON'){
        crc_status = true;
    }
    else if(stringCommand.substring(0,6) === 'CRCOFF'){
        crc_status = false;
    }

    if(crc_status){
    //console.log(1);
      if(stringCommand.indexOf('*') !== -1){
        var checkstring = stringCommand.substring(stringCommand.indexOf('*')+1,stringCommand.indexOf('\r'));
        var crcstring = crc.crc16xmodem(stringCommand.substring(0,stringCommand.indexOf('*')));
        crcstring = crcstring.toString(16).toUpperCase();

        //console.log(2);
        if(checkstring === crcstring){
          realCommand = stringCommand.substring(0,stringCommand.indexOf("*"));

          //console.log(3);
          try{
            resultCommand = commandCheck(realCommand);
            //console.log(4);
            if(resultCommand !== 'OK\r'){
              console.log('CRC ON, LOG: ' + resultCommand.substring(0,resultCommand.indexOf('\r')));
              var ret = crc.crc16xmodem(resultCommand.substring(0,resultCommand.indexOf('\r')));
              var mystr=resultCommand.substring(0,resultCommand.indexOf('\r')) + '*' + ret.toString(16).toUpperCase() + '\r';
              //myPort.write(resultCommand.substring(0,resultCommand.indexOf('\r')) + '*' + ret.toString(16).toUpperCase() + '\r');
              //myWrite(myPort, resultCommand.substring(0,resultCommand.indexOf('\r')) + '*' + ret.toString(16).toUpperCase() + '\r'));
              errCount = 0;
              return mystr;
              //console.log(5);
            }
            else {
              console.log('command error!');  
            }
          }
          catch{
            console.log('real command:' + realCommand);
            console.log('Message:' + resultCommand);
            console.log('CRC ON, Command Error Occur. retry time:' + errCount);
          
            if(errCount > 3){
              errCount = 0;
              //myPort.write('SR+CLOSE\r');
              //            setTimeout(UARTClose,500);
              //setTimeout(UARTOpen,5000);
            }
            else{
                errCount++;
                setTimeout(stringChecker(stringCommand),500);
              }
                //myPort.write('COMMAND_ERROR*46A3\r');
                //errCount++;
          }
        }
        else{
          console.log('CRC Match Error Occur.');
          //myPort.write('CRCERR\r');
          //errCount++;
        }
      }
      else{
        console.log('No * CRC Error Occur.');
        //myPort.write('CRCERR\r');
        //errCount++;
      }
    }
    else{
      realCommand = stringCommand.substring(0,stringCommand.indexOf("\r"));

      try{
        resultCommand = commandCheck(realCommand);
        console.log('LOG: ' + resultCommand.substring(0,resultCommand.indexOf('\r')));
        //myPort.write(resultCommand);
        return resultCommand;
        // errCount = 0;
      }
      catch{
        console.log(resultCommand);
        console.log('CRC OFF, Command Error Occur. retry time:' + errCount);
        if(errCount > 3){
          errCount = 0;
          //myPort.write('SR+CLOSE\r');
          //                      setTimeout(UARTClose,500);
          //setTimeout(UARTOpen,5000);
        }
        else{
          errCount++;
          setTimeout(stringChecker(stringCommand),500);
        }

        //myPort.write('COMMAND_ERROR\r');
        errCount++;
      }
    }

    stringCommand = '';
    realCommand = '';
    resultCommand = '';
  }
}

export function commandCheck(command){

  if(command === 'LP+WON'){
    return 'LP+WON\r';
    //myPort.write('LP+WON\r');
  }
  else if(command === 'LP+WOFF'){
    return 'LP+WOFF\r';
    //myPort.write('LP+WOFF\r');
  }
  else if(command === 'LP+EON'){
    return 'LP+EON\r';
    //myPort.write('LP+EON\r');
  }
  else if(command === 'LP+EOFF'){
    return 'LP+EOFF\r';
    //myPort.write('LP+EOFF\r');
  }
  else if(command === 'LP+AON'){
    return 'LP+AON\r';
    //myPort.write('LP+AON\r');
  }
  else if(command === 'LP+AOFF'){
    return 'LP+AOFF\r';
    //myPort.write('LP+AOFF\r');
  }
  else if(command === 'PW+BATT'){
    return 'PW+BATT\r';
    //myPort.write('PW+BATT\r');
  }
  else if(command === 'PW+OFF'){
    return 'PW+OFF\r';
    //myPort.write('PW+OFF\r');
  }
  else if(command === 'CR+ON'){
    return 'CR+ON\r';
    //myPort.write('CR+ON\r');
  }
  else if(command === 'CR+OFF'){
    return 'CR+OFF\r';
    //myPort.write('CR+OFF\r');
  }                                   // From Web
  else if(command === 'LAMPWON'){
    console.log('LAMP WARNING ON');
    return 'OK\r';
  }
  else if(command === 'LAMPWOFF'){
    console.log('LAMP WARNING OFF');
    return 'OK\r';
  }
  else if(command === 'LAMPEON'){
    console.log('LAMP EMERGENCY ON');
    return 'OK\r';
  }
  else if(command === 'LAMPEOFF'){
    console.log('LAMP EMERGENCY OFF');
    return 'OK\r';
  }
  else if(command === 'LAMPAON'){
    console.log('LAMP ALL ON');
    return 'OK\r';
  }
  else if(command === 'LAMPAOFF'){
    console.log('LAMP ALL OFF');
    return 'OK\r';
  }
  else if(command.substring(0,3) === 'BAT'){
    if(command.indexOf('%') !== -1){
      battery = Number(command.substring(3,command.indexOf('%')));
      console.log('Battery:' + battery + '%');
      return 'OK\r';
    }
    else{
      console.log('Battery value error occur. please retry.');
      return 'Error\r'
    }
  }
  else if(command === 'POWEROFF'){
    // run shell script
    //UARTClose();
    exec("../shutdown.sh", (error, data, getter) => {
      if(error){
        console.log("error",error.message);
        return;
      }
      if(getter){
        console.log("data",data);
        return;
      }
      console.log("data",data);

    });

    console.log("Power Off.");
    return 'OK\r';
  }
  else if(command === 'CRCON'){
    crc_status = true;
    return 'OK\r';
  }
  else if(command === 'CRCOFF'){
    crc_status = false;
    return 'OK\r';
  }                                   // From Power Board
}
//////////////////////////////////////////////////////////////////////////////////////////////