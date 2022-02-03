import Axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Modal.css';

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data, dataSet, dataState, type } = props;
  const { register, handleSubmit, setFocus, setValue, getValues } = useForm();
  const inputRef = useRef(null);
  const [ delInputValue, setDelInputValue ] = useState('');

  useEffect(() => {
    if (data !== undefined && dataState) {
      setValue("moduleIdx", data.moduleIdx);
      setValue("modelNo", data.modelNo);
      setValue("modelSerial", data.modelSerial);
      setValue("modelNm", data.modelNm);
      setValue("userNm", data.userNm);
      setValue("rgstId", data.rgstId);
      setValue("rgstDt", moment(data.rgstDt).format("YYYY-MM-DD HH:MM:SS"));
      dataSet();
      setFocus("modelNo");
      inputRef.current.focus();
    }
  }, [dataState])

  const onSubmit = (data) => {
    if (type) {
      data.moduleScn = 0;
      Axios.post( '/api/module/updateData',
        {
          ...data,
          rgstDt : new Date(data.rgstDt),
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
          alert('수정 완료');
          window.location.reload(false);
        } else if (response.data === "duplicate") {
          alert('이미 등록된 고유번호 혹은 장치명입니다');
        } else {
          alert('수정 실패');
          console.log(response);
        }
      })
      .catch((response) => {
        alert('수정 실패');
        console.log(response);
      });
    } else {
      data.moduleScn = 0;
      if (data.modelNm === delInputValue) {
        Axios.post( '/api/module/deleteData',
          {
            ...data,
            rgstDt : new Date(data.rgstDt),
            delFlag : 1
          },
          {
            headers : {
              'Content-type': 'application/json',
              'Accept': 'application/json'
            }
          }
        ).then((response) => { 
          alert('삭제 완료');
          window.location.reload(false);
        })
        .catch((response) => {
          alert('삭제 실패');
        });
      } else {
        alert("모델명이 일치하지 않습니다.");
      }
    }
  };

  const onChange = (e) => {
    setDelInputValue(e.target.value);
  }

  const handleModalOff = (e) => {
    const clicked = e.target.closest('.modalSection');
    if (clicked) return;
    if (!clicked) close();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      close();
    }
    if (e.key === 'Enter') {
      onSubmit(getValues());
    }
  }

  return (
    // 모달이 열릴때 openModal 클래스가 생성
    <div className={open ? 'openModal modal' : 'modal'} tabIndex={0} onClick={(e) => handleModalOff(e)} onKeyDown={(e) => handleKeyDown(e)}>
      {open ? (
        <section className='modalSection'>
          <header>
            {header}
            <button className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>
            <form className="table-form" onSubmit={handleSubmit(onSubmit)} style={{display:(type ? "block": "none")}}>
              <div>
                <label htmlFor="moduleIdx">장치번호</label>
                <input type="text" name="moduleIdx" {...register("moduleIdx")} className="nonEditable" value={data.moduleIdx || ''} />
              </div>
              <div>
                <label htmlFor="modelNo">고유번호</label>
                <input type="text" name="modelNo" {...register("modelNo")} defaultValue={data.modelNo} />
              </div>
              <div>
                <label htmlFor="modelSerial">시리얼넘버</label>
                <input type="text" name="modelSerial" {...register("modelSerial")} defaultValue={data.modelSerial} />
              </div>
              <div>
                <label htmlFor="modelNm">장치명</label>
                <input type="text" name='modelNm' {...register("modelNm")} defaultValue={data.modelNm} />
              </div>
              <div>
                <label htmlFor="moduleScn">검지유형</label>
                <input type="text" name='moduleScn' {...register("moduleScn")} className="nonEditable" value={"가스"} />
              </div>
              <div>
                <label htmlFor="userNm">관리자</label>
                <input type="text" name='userNm' {...register("userNm")} defaultValue={data.userNm} />
              </div>
              <div>
                <label htmlFor="rgstId">등록자</label>
                <input type="text" name='rgstId' {...register("rgstId")} className="nonEditable" value={data.rgstId || ''} />
              </div>
              <div>
                <label htmlFor="rgstDt">등록일</label>              
                <input type="text" name='rgstDt' {...register("rgstDt")} className="nonEditable" value={moment(data.rgstDt).format("YYYY-MM-DD HH:MM:SS") || ''} />
              </div>
            </form>
            <div className='deleteModule' style={{display:(type ? "none" : "block")}}>
              <p>
                장치를 삭제하시면 다시
                <span className='importantWord'>복구</span>
                할 수 없습니다.
              </p>
              <p>
                계속 진행하시려면
                <span className='importantWord'>모델명</span>
                을 입력해주세요.
              </p>
              <div className='labelInputBox'>
                <label htmlFor='deleteModuleChecker'>모델명 : </label>
                <input type='text' name='deleteModuleChecker' className='modelNameInput' ref={inputRef} onChange={onChange}/>
              </div>
            </div>
          </main>
          <footer>
            <button className={"submit " + (type ? "" : "delBtn")} type='submit' onClick={handleSubmit(onSubmit)}>
              {' '}
              {type ? "수정": "삭제"}{' '}
            </button>
            <button className="close" onClick={close}>
              {' '}
              닫기{' '}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal