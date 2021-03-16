import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RiTreasureMapLine } from 'react-icons/ri';
import { FaMapMarkedAlt, FaHome, FaList, FaPowerOff } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';
import { TiDocumentText } from 'react-icons/ti';

import { AppHeaderContainer } from './MainContainer.css';

import ci from 'static/images/logo.png'

const titleMap = {
  '/': '가스 현황',
  // '/map/table': '지도상세 데이터',
  // '/control': '가스농도 종합현황',
  '/table': '상세 데이터',
  '/graph': '상세 그래프',
  '/log': '로그 데이터',
}

const AppHeader = ( props ) => {
  const [title, setTitle] = useState('지도현황');
  const [ ip, setIp ] = useState("");

  useEffect(() => {
    setTitle(titleMap[props.history.location.pathname]);
  }, [props.history.location])

  const moveLinkPage = (link) => {
    props.history.push(link);
  }

  useEffect(() => {
    axios.get("/api/get/ip", {})
      .then(response => {
        setIp(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  return (
    <AppHeaderContainer>
      <div className="header_logo"><img src={ci} alt="ci" /><div>{ ip }</div></div>
      <div className="header_title">{ title }</div>
      <div className="header_buttons">
        {/* <div className="button_box" onClick={ () => { moveLinkPage('/') } }>
          <FaMapMarkedAlt />
        </div>
        <div className="button_box" onClick={ () => { moveLinkPage('/map/table') } }>
          <RiTreasureMapLine />
        </div> */}
        <div className="button_box" onClick={ () => { moveLinkPage('/') } }>
          <FaHome />
        </div>
        <div className="button_box" onClick={ () => { moveLinkPage('/table') } }>
          <FaList />
        </div>
        <div className="button_box" onClick={ () => { moveLinkPage('/graph') } }>
          <BsGraphUp />
        </div>
        <div className="button_box" onClick={ () => { moveLinkPage('/log') } }>
          <TiDocumentText />
        </div>
      </div>
    </AppHeaderContainer>
  )
}

export default AppHeader;