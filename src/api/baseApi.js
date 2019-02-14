import axios from 'axios';
import { setAlert } from '../containers/alert/reducer';
import { setUserSession } from '../containers/authentication/reducer';
import store from '../store/index';

// const API = axios.create({
//   baseURL: ,
// });

const BASE_URL = `http://localhost:3000`;

const headers = new Headers({
  'Content-Type': 'application/json',
  // 'Content-Encoding': 'gzip',
});

const apiRequest = async (method, url, data = null) => {
  try {
    let requestObject = {
      method,
      url: `${BASE_URL}/${url}`,
      headers: { ...headers, ...authHeader() },
    };
    if (data) requestObject = { ...requestObject, data };
    const response = await axios(requestObject);
    return response;
  } catch (error) {
    let userErrorMessage;
    if (error.response) {
      // The request was made and the server responded with a status code
      userErrorMessage = handleApiResponse(error.response);
    } else if (error.request) {
      // The request was made but no response was received
      userErrorMessage = 'Sorry, we are unable to reach our server';
      displayErrorAlert(userErrorMessage);
    } else {
      // Something happened in setting up the request that triggered an error
      userErrorMessage = `Sorry, we couldn't process your request`;
      displayErrorAlert(userErrorMessage);
    }
    throw (error.response || {}).data || userErrorMessage;
  }
};

const handleApiResponse = (response = {}) => {
  if (response.status === 404) {
    store.dispatch(setUserSession(null));
  }
  // TODO: Add default error message, if not available in api response
  const userErrorMessage = (response.data || {}).userMessage;
  displayErrorAlert(userErrorMessage);
  return userErrorMessage;
};

const displayErrorAlert = message => {
  store.dispatch(
    setAlert({
      type: 'Error',
      message,
    })
  );
};

const authHeader = () => {
  const authToken = localStorage.getItem('x-access-token');
  if (authToken) {
    return { Authorization: `bearer ${authToken}` };
  }
  return {};
};

export default apiRequest;
