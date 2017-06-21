import { api } from '../config/symphony';

const get = uri => fetch(`${api}${uri}`)
  .then(response => response.json())
  .then(response => Promise.resolve(response))
  .catch(error => Promise.reject(error));

const post = (uri, form) => fetch(`${api}${uri}`, {
  method: 'POST',
  body: JSON.stringify(form)
}).then(response => response.json())
  .then(response => Promise.resolve(response))
  .catch(error => Promise.reject(error));

export default {
  get,
  post
};
