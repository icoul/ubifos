import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";

import { BiSave } from "react-icons/bi";

let sw = true;

const ModuleNameBox = ({ moduleIdx, modelNm }) => {
  const [ modelNmInputBoxFlag, setModelNmInputBoxFlag ] = useState(sw);

  const handleClick = () => {
    setModelNmInputBoxFlag((sw) => {
      sw = false;
      return sw;
    });
  };

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    setModelNmInputBoxFlag((sw) => {
      sw = true;
      return sw;
    });

    axios.post( '/api/module/update',
      {
        modelNm : data.modelNm,
        moduleIdx : parseInt(data.moduleIdx)
      },
      {
        headers : {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      }
    ).then((response) => { 
      alert('수정 완료');
    })
    .catch((response) => {
      alert('수정 실패');
    });
  };

  const onError = (error) => {
    alert("모델명을 입력해주세요");
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="moduleName" onClick={() => { handleClick(); }}>
        <input type="text" {...register("moduleIdx")} value={moduleIdx} style={{display: 'none'}} />
        <input type="text" name='modelNm' {...register("modelNm", { required: true })} className='inputModelNm' readOnly={modelNmInputBoxFlag} defaultValue={modelNm} />
      </div>
      <div className="editBox" style={{display:(modelNmInputBoxFlag ? 'none' : 'block')}}>
        <button type='submit'><BiSave /></button>
      </div>
    </form>
  )
}

export default ModuleNameBox