import Axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSave } from "react-icons/bi";
import { ButtonBarConatiner } from "./ButtonBar.css";
import { FormContainer } from "./ModuleRegister.css";

const ModuleRegister = (props) => {
  const { flag } = props;
  const [ formBoxFlag, setFormBoxFlag ] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  const handleClick = () => {
    if (!formBoxFlag) {
      setValue("modelNo", "");
      setValue("modelSerial", "");
      setValue("modelNm", "");
      setValue("userNm", "");
      setValue("rgstId", "");
    }
    setFormBoxFlag((formBoxFlag) => {
      return !formBoxFlag;
    })
  }

  const onSubmit = (data) => {
    Axios.post( '/api/module/insertData',
      {
        moduleIdx : null,
        ...data,
        moduleScn : 0,
        rgstDt : new Date(),
        delFlag : 0
      },
      {
        headers : {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then((response) => {
      if (response !== null && response.data === "success") {
        alert('등록 완료');
        flag();
        setFormBoxFlag(false);
      } else if (response.data === "duplicate") {
        alert('이미 등록된 고유번호 혹은 장치명입니다');
      } else {
        alert('등록 실패');
        console.log(response);
      }
    })
    .catch((response) => {
      alert('등록 실패');
      console.log(response);
    });
  };

  return (
    <ButtonBarConatiner>
      <div className="buttonBar-container">
        <button className="search-condition csv-btn col-xl-4 col-sm-6" onClick={() => { handleClick(); }}>{(formBoxFlag ? "등록취소" : "등록")}</button>
      </div>
      <FormContainer>
        {formBoxFlag &&
          <div className="form-container">
            <form className="table-form" onSubmit={handleSubmit(onSubmit)}>
              <table role="table">
                <thead>
                  <tr>
                    <th>고유번호</th>
                    <th>시리얼</th>
                    <th>장치명</th>
                    <th>검지유형</th>
                    <th>관리자</th>
                    <th>등록자</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><input type="text" {...register("modelNo")} /></td>
                    <td><input type="text" {...register("modelSerial")} /></td>
                    <td><input type="text" {...register("modelNm")} /></td>
                    <td><input type="text" {...register("moduleScn")} value={"가스"} className="nonEditable" /></td>
                    <td><input type="text" {...register("userNm")} /></td>
                    <td><input type="text" {...register("rgstId")} /></td>
                  </tr>
                </tbody>
              </table>
              <div className="uploadBox">
                <button type="submit"><BiSave /></button>
              </div>
            </form>
          </div>
        }
      </FormContainer>
    </ButtonBarConatiner>
  )
}

export default ModuleRegister