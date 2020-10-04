import axios from 'axios'

export const baseUrl = process.env.REACT_APP_API_HOST

axios.defaults.withCredentials = true;

export const ajaxFetch = request => {

  let {
    url = '',
    method = 'GET',
    data = null,
    headers = null
  } = request;

  const dataOrParams = ['GET', 'DELETE'].includes(method.toUpperCase()) ? 'params' : 'data';

  return axios.request({baseURL: baseUrl, url, method, headers, [dataOrParams]: data})
    .then(response => {
      return response.data;
    })
    .catch(e => {
      const error = handleError(e, request);
      return Promise.reject(error);
    })

}

const handleError = (e, request) => {
  const error = getError(e);
  return error;
}

const getError = e => {
  const data = e && e.response && e.response.data;
  if (data && data.status && data.message) { // API error
    return data;
  }

  if (e.isAxiosError) {
    e = e.toJSON();
    return { status: e.code || 400, message: e.message }
  }
  else {
    return { status: 400, message: e }
  }
}
