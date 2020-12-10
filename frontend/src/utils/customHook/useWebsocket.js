import { useEffect } from 'react';
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockJS = new SockJS("http://127.0.0.1:3000/ws");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};

export const useWebsocket = (setTime) => {
  useEffect(() => {
    stompConnect();
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stompConnect = () => {
    stompClient = Stomp.over(sockJS);
    stompClient.connect({},
                        onConnected, 
                        failureWebsocket);
  }

  const onConnected = () => {
    stompClient.subscribe('/topic/return', (data) => {
      setTime(Number(data.body));
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const failureWebsocket = (error) => {
    console.log('STOMP: ' + error);
    setTimeout(window.location.reload(), 10000);
    console.log('STOMP: Reconecting in 10 seconds');
  }
};
