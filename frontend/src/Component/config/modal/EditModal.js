import Axios from 'axios';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Modal.css';

const EditModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data, flag } = props;
  const { register, handleSubmit, setFocus, setValue, getValues } = useForm();

  useEffect(() => {
    if (data !== undefined && open) {
      setValue("moduleIdx", data.moduleIdx);
      setValue("modelNo", data.modelNo);
      setValue("modelSerial", data.modelSerial);
      setValue("modelNm", data.modelNm);
      setValue("userNm", data.userNm);
      setValue("rgstId", data.rgstId);
      setValue("rgstDt", moment(data.rgstDt).format("YYYY-MM-DD HH:MM:SS"));
      setFocus("modelNo");
    }
  }, [open])

  const onSubmit = (data) => {
    Axios.post( '/api/module/updateData',
      {
        ...data,
        moduleScn : 0,
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
        flag();
        close();
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
    // 모달이 열릴때 openEditModal 클래스가 생성
    <div className={open ? 'openEditModal modal' : 'modal'} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      {open ? (
        <>
          <div className='modalBackground' onClick={close} />
          <section className='modalSection'>
            <header>
              {header}
              <button className="close" onClick={close}>&times;</button>
            </header>
            <main>
              <form className="tableForm" onSubmit={handleSubmit(onSubmit)} >
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
            </main>
            <footer>
              <button className="submit" type='submit' onClick={handleSubmit(onSubmit)}>수정</button>
              <button className="close" onClick={close}>닫기</button>
            </footer>
          </section>
        </>
      ) : null}
    </div>
  );
};

export default EditModal