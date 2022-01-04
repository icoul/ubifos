import axios from "axios";
export const GET_CRITERION_REQUEST = "GET_CRITERION_REQUEST";
export const GET_CRITERION_DELETE = "GET_CRITERION_DELETE";
export const GET_GAS_CRITERION_SUCCESS = "GET_GAS_CRITERION_SUCCESS";
export const GET_CTA_CRITERION_SUCCESS = "GET_CTA_CRITERION_SUCCESS";
export const GET_CRITERION_FAILURE = "GET_CRITERION_FAILURE";

export const getCriterionRequest = () => {
  return {
    type: GET_CRITERION_REQUEST,
  };
};

export const getCriterionDelete = () => {
  return {
    type: GET_CRITERION_DELETE,
  };
};

export const getGasCriterionSuccess = (data) => {
  return {
    type: GET_GAS_CRITERION_SUCCESS,
    gas: data,
  };
};

export const getCtaCriterionSuccess = (data) => {
  return {
    type: GET_CTA_CRITERION_SUCCESS,
    leakage: data,
  };
};

export const getCriterionFailure = (error) => {
  return {
    type: GET_CRITERION_FAILURE,
    error,
  };
};

export const getGasCriterion = () => {
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

export const getCtaCriterion = () => {
  return (dispatch) => {
    dispatch(getCriterionRequest());

    return axios
      .get("/api/ctaCriterion/getMapData")
      .then((response) => {
        dispatch(getCtaCriterionSuccess(response.data));
      })
      .catch(function (error) {
        dispatch(getCriterionFailure(error));
      });
  };
};

export const criterion = (state = {}, action) => {
  switch (action.type) {
    case "GET_CRITERION_REQUEST":
      return { status: "WAITING" };
    case "GET_CRITERION_DELETE":
      return {};
    case "GET_GAS_CRITERION_SUCCESS":
      return { ...state, gas: action.gas, status: "SUCCESS" };
    case "GET_CTA_CRITERION_SUCCESS":
      return { ...state, cta: action.cta, status: "SUCCESS" };
    case "GET_CRITERION_FAILURE":
      console.log(state);
      return { ...state, status: "FAIL" };
    default:
      return state;
  }
};
