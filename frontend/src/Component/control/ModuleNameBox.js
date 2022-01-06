import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from "axios";

import { BiSave } from "react-icons/bi";

let sw = true;

const ModuleNameBox = ({ moduleIdx, modelNm }) => {
  const [ modelNmInputBoxFlag, setModelNmInputBoxFlag ] = useState(sw);
  const [ newModelNm, setNewModelNm ] = useState(modelNm);

  const handleClick = () => {
    setModelNmInputBoxFlag((sw) => {
      sw = false;
      return sw;
    });
  };

  // const submitNewModelNm = () => {
  //   console.log(newModelNm);
  // };

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setModelNmInputBoxFlag((sw) => {
      sw = true;
      return sw;
    });
    alert(JSON.stringify(data));

    // fetch("/api/module/update", {
    //   method : 'post',
    //   headers : {
    //     'content-type' : 'application/json'
    //   },
    //   body : JSON.stringify(data)
    // })

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
      alert(response.data);
      console.log(response.data); 
    })
    .catch((response) => {
      alert(response);
      console.log('Error!');
    });

    // const updateData = async(datas) => {
    //   const change = datas;
    //   if(change !== null){
    //     const data = {
    //       modelNm: change.modelNm,
    //       moduleIdx: change.moduleIdx
    //     }
    //     const res = await axios('/api/module/update', {
    //       method: 'POST',
    //       data: {'change' : data},
    //       headers: new Headers()
    //     })
    //     if(res.data){
    //       alert('Updated data!');
    //       return window.location.reload();
    //     }
    //   }
    // }
  };

  return (
    <form autoComplete='off' onSubmit={handleSubmit(onSubmit)} /*action='/api/module/update'*/>
      <div className="moduleName" onClick={() => { handleClick(); }}>
        <input type="text" {...register("moduleIdx")} value={moduleIdx} style={{display: 'none'}} />
        <input type="text" {...register("modelNm")} className='inputModelNm' readOnly={modelNmInputBoxFlag} defaultValue={modelNm} />
        {/* <input type="text" style={{width:'90%', fontSize:'40px', display:'none'}}></input> */}
      </div>
      <div className="editBox" style={{display:(modelNmInputBoxFlag ? 'none' : 'block')}}>
        <button type='submit'><BiSave /></button>
      </div>
    </form>
  )
}

export default ModuleNameBox