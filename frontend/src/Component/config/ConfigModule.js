import Axios from "axios";
import EditModal from "component/config/modal/EditModal";
import DeleteModal from "component/config/modal/DeleteModal";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { Styles } from "component/config/ConfigModule.css";
import ModuleRegister from "./ModuleRegister";

const ConfigModule = () => {
  const [ data, setData ] = useState([]);
  const [ editModalOpen, setEditModalOpen ] = useState(false);
  const [ delModalOpen, setDelModalOpen ] = useState(false);
  const [ modalData, setModalData ] = useState();
  
  // 수정 모달 열기
  const openEditModal = (index) => {
    setEditModalOpen(true);
    setModalData(data[index]);
  };

  // 삭제 모달 열기
  const openDelModal = (index) => {
    setDelModalOpen(true);
    setModalData(data[index]);
  };

  // 수정 모달 닫기
  const closeEditModal = () => {
    setEditModalOpen(false);
  };

  // 삭제 모달 닫기
  const closeDelModal = () => {
    setDelModalOpen(false);
  };

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
      <EditModal open={editModalOpen} close={closeEditModal} header={"장치 정보 수정"} data={modalData} flag={getData} />
      <DeleteModal open={delModalOpen} close={closeDelModal} header={"장치 삭제"} data={modalData} flag={getData} />
      <Styles tableType="editable">
        <ModuleRegister flag={getData}/>
        <div className="tableContainer">
          <table className="configModuleTable" role="table">
            <thead className="cmTableHead">
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
                      <div className="btnWrap">
                        <button className="btn editModalBtn" onClick={() => { openEditModal(index); }}>수정</button>
                      </div>
                    </td>
                    <td className="btnBox" role="cell">
                      <div className="btnWrap">
                        <button className="btn deleteModalBtn" onClick={() => { openDelModal(index); }}>삭제</button>
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