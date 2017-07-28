import { Alert } from 'react-native';

import { api } from '../config/symphony';
import ownerAction from '../actions/Owner';

const errorProcess = (response) => {
  if (response.status === 200) {
    return true;
  }

  if (response.status === 403) {
    ownerAction.logout();
  } else {
    Alert.alert(response.status.toString(), response.url);
  }

  return false;
};

const get = async (uri) => {
  try {
    let response = await fetch(`${api}${uri}`);
    if (errorProcess(response)) {
      response = response.json();
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const post = async (uri, form) => {
  try {
    let response = await fetch(`${api}${uri}`, {
      method: 'POST',
      body: JSON.stringify(form)
    });
    if (errorProcess(response)) {
      response = response.json();
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

const put = async (uri, form) => {
  try {
    let response = await fetch(`${api}${uri}`, {
      method: 'PUT',
      body: JSON.stringify(form)
    });
    if (errorProcess(response)) {
      response = response.json();
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get,
  post,
  put
};
