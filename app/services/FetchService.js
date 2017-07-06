import { api } from '../config/symphony';

const get = async (uri) => {
  try {
    let response = await fetch(`${api}${uri}`);
    response = response.json();
    return Promise.resolve(response);
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
    response = response.json();
    return Promise.resolve(response);
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
    response = response.json();
    return Promise.resolve(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  get,
  post,
  put
};
