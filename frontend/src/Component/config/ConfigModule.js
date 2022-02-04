import Axios from "axios";
import Modal from "component/config/modal/Modal";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Styles } from "utils/table/Table.css";
import ModuleRegister from "./ModuleRegister";

const ConfigModule = () => {
  const [ data, setData ] = useState([]);
  const [ modalOpen, setModalOpen ] = useState(false);
  const [ modalHeader, setModalHeader ] = useState();
  const [ modalData, setModalData ] = useState();
  const [ modalDataSet, setModalDataSet ] = useState(false);
  const [ modalType, setModalType ] = useState(true);
  const [ renderFlag, setRenderFlag ] = useState(false);

  const openModal = (index, type) => {
    if (type) setModalHeader("장치 정보 수정");
    else setModalHeader("장치 삭제");
    setModalOpen(true);
    setModalData(data[index]);
    setModalDataSet(true);
    setModalType(type);
  };

  const childRenderFlag = () => {
    setRenderFlag(!renderFlag);
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  const dataSw = () => {
    setModalDataSet(!modalDataSet);
  }

  const getData = useCallback(() => {
    Axios.get("/api/get/all/modules")
    .then(response => {
      setData(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  }, [])

  useEffect(() => {
    getData();
  }, [getData])

  return (
    <section>
      <Modal open={modalOpen} close={closeModal} header={modalHeader} data={modalData} dataSet={dataSw} dataState={modalDataSet} type={modalType}/>
      <Styles tableType="editable">
        <ModuleRegister flag={getData}/>
        <div className="table-container">
          <table role="table">
            <thead>
              <tr role="row">
                <th colSpan="12" role="columnheader">장치정보</th>
              </tr>
              <tr role="row">
                <th role="columnheader"></th>
                <th role="columnheader">장치번호</th>
                <th role="columnheader">고유번호</th>
                <th role="columnheader">시리얼</th>
                <th role="columnheader">장치명</th>
                <th role="columnheader">검지유형</th>
                <th role="columnheader">관리자</th>
                <th role="columnheader">등록자</th>
                <th role="columnheader">등록일</th>
                <th role="columnheader"></th>
                <th role="columnheader"></th>
                <th role="columnheader"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((datas, index) => {
                return (
                  (datas.delFlag === 0 ?
                  <tr role="row" key={datas.moduleIdx}>
                    <td className="cellIndex" role="cell">{index + 1}</td>
                    <td className="moduleIndex" role="cell">{datas.moduleIdx}</td>
                    <td className="modelNumber" role="cell">{datas.modelNo}</td>
                    <td className="modelSerial" role="cell">{datas.modelSerial}</td>
                    <td className="modelName" role="cell">{datas.modelNm}</td>
                    <td className="detectKinds" role="cell">{ScnToString(datas.moduleScn)}</td>
                    <td className="userName" role="cell">{datas.userNm}</td>
                    <td className="registerId" role="cell">{datas.rgstId}</td>
                    <td className="registerDate" role="cell">{moment(datas.rgstDt).format("YYYY-MM-DD")}</td>
                    <td className="btnBox" role="cell"></td>
                    <td className="btnBox" role="cell">
                      <div>
                        <button className="table-search-submit btn btn-info" onClick={() => { openModal(index, true); }}>수정</button>
                      </div>
                    </td>
                    <td className="btnBox" role="cell">
                      <div>
                        <button className="table-search-submit btn btn-info" onClick={() => { openModal(index, false); }}>삭제</button>
                      </div>
                    </td>
                  </tr>
                  : <></>)
                )
              })}
            </tbody>
          </table>
        </div>
      </Styles>
    </section>
  )
}

export default ConfigModule;

const ScnToString = (moduleScn) => {
  switch (moduleScn) {
    case 0:
      return "가스";
  
    default:
      return "미확인";
  }
}