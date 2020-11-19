import React from 'react';
import { FaHome, FaList, FaPowerOff } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';

import { AppHeaderContainer } from './MainContainer.css';

import ci from 'static/images/logo.png'

const AppHeader = () => {
  return (
    <AppHeaderContainer>
      <div className="header_logo"><img src={ci} alt="ci" /></div>
      <div className="header_title">가스농도 현황</div>
      <div className="header_buttons">
        <div className="button_box">
          <FaHome />
        </div>
        <div className="button_box">
          <FaList />
        </div>
        <div className="button_box">
          <BsGraphUp />
        </div>
        <div className="button_box">
          <FaPowerOff />
        </div>
      </div>
    </AppHeaderContainer>
  )
}

export default AppHeader;