import React, { useEffect } from 'react'
import SockJS from "sockjs-client";
import Stomp from "stompjs";

let sockJS = new SockJS("http://localhost:3000/ws");
let stompClient = Stomp.over(sockJS);
stompClient.debug= () => {};

const WsContainer = ({ status }) => {
  const [message, setMessage] = React.useState(0);

  useEffect(()=>{
    stompClient.connect({},()=>{
      stompClient.subscribe('/topic/return',(data)=>{
        setMessage(data.body);
      });
    });
  },[]);

  useEffect(() => {
    setMessage(0);
  }, [status])

  return (
    <div className={"container"}>
      <div>{ message }</div>
    </div>
  );
};

export default WsContainer;