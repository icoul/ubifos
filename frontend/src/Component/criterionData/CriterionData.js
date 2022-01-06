import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
// import { getGasCriterion } from 'redux/action/criterion';
import axios from "axios";
import { EditableCriterionTable } from 'utils/table/EditableCriterionTable';

import { columns } from "./columns";

import { updateCriterionDataValidate } from 'utils/validate/updateCriterionDataValidate';
import { customAxiosGetFunction, customAxiosPostFunction } from 'utils/axiosFunction';
import { Styles } from 'utils/table/Table.css.js';
import './CriterionButtonBar.css';
import { FaSave, FaUndo } from "react-icons/fa";

const GET_CRITERION_REQUEST = "GET_CRITERION_REQUEST";
const GET_GAS_CRITERION_SUCCESS = "GET_GAS_CRITERION_SUCCESS";
const GET_CRITERION_FAILURE = "GET_CRITERION_FAILURE";

const getCriterionRequest = () => {
  return {
    type: GET_CRITERION_REQUEST,
  };
};

const getGasCriterionSuccess = (data) => {
  return {
    type: GET_GAS_CRITERION_SUCCESS,
    gas: data,
  };
};

const getCriterionFailure = (error) => {
  return {
    type: GET_CRITERION_FAILURE,
    error,
  };
};

const getGasCriterion = () => {
  return (dispatch) => {
    dispatch(getCriterionRequest());

    return axios
      .get("/api/gasCriterion/getMapData")
      .then((response) => {
        dispatch(getGasCriterionSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(getCriterionFailure(error));
      });
  };
};

const CriterionData = () => {
  const history = useHistory();
  // const dispatch = useDispatch();
  const [ criterionList, setCriterionList ] = useState([]);
  const [ data, setData ] = useState([]);
  const column = useMemo(() => columns, []);

  const getCriterion = async() => { 
    setData([]);
    const response = await customAxiosGetFunction(history, '/api/gasCriterion/getAllData');
    setCriterionList(response);
  }

  useEffect(() => {
    getCriterion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tableData = criterionList.map((d, index) => {
      return {
        rnum  : index + 1, 
        ...d, 
        criterionValueList: d.criterionValueList.map(data => {
          return {
            ...data,
            criterionIdx: d.criterionIdx
          }
        }),
      }
    })
    
    setData(tableData);
  }, [criterionList]);

  const updateDataSave = useCallback(() => {
    if (updateCriterionDataValidate(data)) {
      alert('관리기준 설정은 숫자만 입력');
      return false;
    }
    
    customAxiosPostFunction(history, '/api/gasCriterion/update', data).then(
      response => {
        if(response) {
          alert("저장완료");
          getGasCriterion();
          getCriterion();
        }
        else {
          alert("업데이트실패");
        }
      }
    );
  }, [data]);

  return(
    <section>
      <Styles tableType="editable">
        <EditableCriterionTable columns={column} 
                                data={data} 
                                setData={setData}>
          <div className="buttonBar-conatiner">
            <div className="form-row">
              <div className="button-condition col-xl-1 col-sm-6">
                {/* <button type="button" 
                        className="table-button-submit btn btn-info"
                        onClick={getCriterion}>초기화</button>
                <div className="button_box"><FaUndo /></div> */}
                <div className="table-button-submit btn btn-info button_box" onClick={getCriterion}><FaUndo /></div>
              </div>
              <div className="button-condition col-xl-1 col-sm-6">
                {/* <button type="button" 
                        className="table-button-submit btn btn-info"
                        onClick={updateDataSave}>저장</button>
                <div className="button_box"><FaSave /></div> */}
                <div className="table-button-submit btn btn-info button_box" onClick={updateDataSave}><FaSave /></div>
              </div>
            </div>
          </div>
        </EditableCriterionTable>
      </Styles>
    </section>
  )
}

export default CriterionData;