import axios from 'axios';
import Qs from 'qs';

export function customAxiosGetFunction(history, url, params) {
  return axios.get(url, params)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      errorStatusHandler(error.response.status, history);
      console.log(error); 
    });
}

export function customAxiosPostFunction(history, url, params) {
  return axios.post(url, params)
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      errorStatusHandler(error.response.status, history);
      console.log(error); 
    });
}

export function customCreateAxiosGetFunction(history, url, params) {
  let myAxios = axios.create({
    paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'repeat'})
  })

  return myAxios.get(url, {params})
    .then(response => {
      return response.data;
    })
    .catch(function (error) {
      errorStatusHandler(error.response.status, history);
      console.log(error); 
    }); 
}

function errorStatusHandler(errorStatus, history) {
  history.replace(history.location.pathname, {
    errorStatusCode: errorStatus
  });

  history.go(0);
}