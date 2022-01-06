import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
// import { RiTreasureMapLine } from "react-icons/ri";
import { /*FaMapMarkedAlt,*/ FaHome, FaList, FaWhmcs, /*FaPowerOff*/ } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";
import { TiDocumentText } from "react-icons/ti";

import { AppHeaderContainer } from "./MainContainer.css";

const titleMap = {
  // "/": "지도 현황",
  // "/map/table": "지도상세 데이터",
  "/": "가스농도 종합현황",
  "/criterion": "관리 기준 설정",
  "/table": "상세 데이터",
  "/graph": "상세 그래프",
  "/log": "로그 데이터",
  "/admin": "관리자 페이지",
};

const AppHeader = (props) => {
  const history = useHistory();
  const [title, setTitle] = useState("가스농도 종합현황");
  const [adminPageTrigger, setAdminPageTrigger] = useState(0);
  const [ip, setIp] = useState("");
  const [logo, setLogo] = useState("");

  const getLogo = () => {
    axios
      .get("/api/logo/get")
      .then((response) => {
        setLogo(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getLogo();
  }, []);

  useEffect(() => {
    setTitle(titleMap[props.history.location.pathname]);
  }, [props.history.location]);

  const handleClick = () => {
    setAdminPageTrigger((adminPageTrigger) => {
      return adminPageTrigger + 1;
    });
  };

  const moveLinkPage = (link) => {
    history.push(link);
  };

  useEffect(() => {
    axios
      .get("/api/get/ip", {})
      .then((response) => {
        setIp(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (adminPageTrigger === 5) {
      history.push("/admin");
      setAdminPageTrigger(0);
    }
  }, [adminPageTrigger, history, props.history]);

  return (
    <AppHeaderContainer>
      <div className="header_logo">
        {/* <img
          src={ci}
          alt="ci"
          onClick={() => {
            handleClick();
          }}
        /> */}
        <img
          alt="ci"
          src={`data:image/jpg;base64, ${logo}`}
          onClick={() => {
            handleClick();
          }}
        />
        <div>{ip}</div>
      </div>
      <div className="header_title">{title}</div>
      <div className="header_buttons">
        {/* <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/");
          }}
        >
          <FaMapMarkedAlt />
        </div>
        <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/map/table");
          }}
        >
          <RiTreasureMapLine />
        </div> */}
        <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/");
          }}
        >
          <FaHome />
        </div>
        <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/criterion");
          }}
        >
          <FaWhmcs />
        </div>
        <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/table");
          }}
        >
          <FaList />
        </div>
        <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/graph");
          }}
        >
          <BsGraphUp />
        </div>
        <div
          className="button_box"
          onClick={() => {
            moveLinkPage("/log");
          }}
        >
          <TiDocumentText />
        </div>
      </div>
    </AppHeaderContainer>
  );
};

export default AppHeader;
