import Axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import './Modal.css';

const DeleteModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data, flag } = props;
  const inputRef = useRef(null);
  const [ delInputValue, setDelInputValue ] = useState('');

  useEffect(() => {
    if (data !== undefined && open) {
      inputRef.current.focus();
    }
  }, [data])

  const deleteSubmit = () => {
    if (data.modelNm === delInputValue) {
      Axios.post( '/api/module/deleteData',
        {
          ...data,
          moduleScn : 0,
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
        flag();
        close();
      })
      .catch((response) => {
        alert('삭제 실패');
        console.log(response);
      });
    } else {
      alert("모델명이 일치하지 않습니다.");
      inputRef.current.focus();
    }
  };

  const onDelInputChange = (e) => {
    setDelInputValue(e.target.value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      close();
    }
    if (e.key === 'Enter') {
      deleteSubmit();
    }
  }

  return (
    // 모달이 열릴때 openDelModal 클래스가 생성
    <div className={open ? 'openDelModal modal' : 'modal'} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      {open ? (
        <>
          <div className='modalBackground' onClick={close} />
          <section className='modalSection'>
            <header>
              {header}
              <button className="close" onClick={close}>&times;</button>
            </header>
            <main>
              <div className='deleteModule'>
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
                  <input type='text' name='deleteModuleChecker' className='modelNameInput' ref={inputRef} onChange={onDelInputChange}/>
                </div>
              </div>
            </main>
            <footer>
              <button className={"submit delBtn"} type='submit' onClick={deleteSubmit}>삭제</button>
              <button className="close" onClick={close}>닫기</button>
            </footer>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default DeleteModal